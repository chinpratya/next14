import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import {
  RowSelection,
  useColumnFiltered,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateScanCookie } from '../../../api/update-scan-cookie';
import {
  CookieCategory,
  CookieItem,
} from '../../../types';

import { CookieCategoryTag } from './cookie-category-tag';
import { DropdownCategoryTage } from './dropdown-category-tag';

export type CookiesListProps = {
  domainId: string;
  cookies: CookieItem[];
  categories: CookieCategory[];
  rowSelection: RowSelection;
  onEdit?: (cookies: CookieItem[]) => void;
};

export const CookiesList = ({
  domainId,
  cookies,
  categories,
  rowSelection,
  onEdit,
}: CookiesListProps) => {
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const editPermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:cookie:update'],
    ],
  });

  const updateCookieScan = useUpdateScanCookie({
    domainId,
    onSuccess: () => {
      rowSelection.onSelectNone?.();
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .updateCookieSuccess
        ),
      });
    },
  });
  const handlerUpdateCookieCategory = (
    categoryId: string
  ) => {
    const selectedRowKeys =
      rowSelection?.selectedRowKeys?.map(
        (key) => key?.toString()?.split('|')?.[0] ?? key
      );

    const updatedCookies = cookies.map((cookie) => {
      if (selectedRowKeys?.includes(cookie.name)) {
        return {
          ...cookie,
          category: categoryId,
        };
      }

      return cookie;
    });

    updateCookieScan.submit({
      cookies: updatedCookies,
    });
  };

  const handlerEditCookie = () => {
    const selectedRowKeys =
      rowSelection?.selectedRowKeys?.map(
        (key) => key?.toString()?.split('|')?.[0] ?? key
      );

    const selectedCookies = cookies.filter((cookie) =>
      selectedRowKeys?.includes(cookie.name)
    );

    onEdit?.(selectedCookies);
    rowSelection.onSelectNone?.();
  };

  const columns: ColumnsType<CookieItem> = [
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.cookies.name}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.cookies.category}
        />
      ),
      key: 'category',
      width: 200,
      dataIndex: 'category',
      render: (category: string) => {
        const categoryObj = categories.find(
          (c) => c.cetegory_name === category
        );

        return (
          <CookieCategoryTag category={categoryObj} />
        );
      },
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.cookies.domain}
        />
      ),
      key: 'domain',
      dataIndex: 'domain',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.cookies.duration}
        />
      ),
      key: 'expiry',
      dataIndex: 'Expiry',
      width: 200,
      render: (expiry: string) => {
        if (expiry === 'Session') {
          return 'Session';
        }
        const duration = dayjs().from(
          dayjs(expiry),
          true
        );

        return !duration.includes('NaN')
          ? duration
          : expiry;
      },
    },
  ];

  const { filteredColumnsKeys, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );

  return (
    <>
      <Flex
        className="mb-2"
        justifyContent="between"
        alignItems="center"
      >
        <Flex>
          {rowSelection?.selectedRowKeys?.length !== 0 ? (
            <>
              <div style={{ width: 46 }}></div>
              <DropdownCategoryTage
                categories={categories}
                onChange={handlerUpdateCookieCategory}
                disabled={!editPermission.isAllow}
              />

              <EditOutlined
                className="mr-2 font-size-lg font-weight-bold"
                onClick={() =>
                  editPermission.isAllow
                    ? handlerEditCookie()
                    : null
                }
                style={{
                  cursor: editPermission.isAllow
                    ? 'pointer'
                    : 'not-allowed',
                }}
              />
            </>
          ) : null}
        </Flex>
        {ColumnTransfer}
      </Flex>
      <Table
        loading={updateCookieScan.isLoading}
        className={css`
          .ant-table-thead > tr > th {
            background-color: rgba(229, 229, 229, 0.3);

            :first-child {
              border-top-left-radius: 0 !important;
            }

            :last-child {
              border-top-right-radius: 0 !important;
            }
          }
        `}
        tableLayout="fixed"
        scroll={{ x: xScroll }}
        rowKey={(record: CookieItem) =>
          `${record.name}|${record.domain}`
        }
        dataSource={cookies}
        columns={filteredColumns}
        rowSelection={{
          ...rowSelection,
          onSelectAll: (selected) => {
            const selectedRowKeys = cookies.map(
              (record) =>
                `${record.name}|${record.domain}`
            );
            rowSelection.onSelectAll?.(
              selected,
              selectedRowKeys
            );
          },
        }}
      />
    </>
  );
};
