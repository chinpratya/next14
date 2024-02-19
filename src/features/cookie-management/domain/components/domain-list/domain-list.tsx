import {
  DashboardOutlined,
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
  ReloadOutlined,
  SearchOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/share-components/flex';
import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { CookieIconOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { useScanCookie } from '../../../cookies';
import { useDeleteDomain } from '../../api/delete-domain';
import { useListDomain } from '../../api/list-domain';
import { CookieDomain } from '../../types';
import { DomainEditModal } from '../domain-edit-modal';

export const DomainList = () => {
  const toggle = useToggle<CookieDomain>();
  const router = useRouter();

  const domainId = router.query.domainId as string;

  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const {
    data,
    isLoading,
    isError,
    refresh,
    isRefreshing,
  } = useListDomain({
    page,
    pageSize,
  });

  const scanCookies = useScanCookie({});

  const deleteDomain = useDeleteDomain({
    onSuccess: () => {
      toggle.remove();

      const filteredDomain = _.filter(
        data?.data,
        (domain) =>
          domain.domainID !== toggle.data.domainID
      );

      if (domainId === toggle.data.domainID) {
        if (!filteredDomain.length) {
          router.push(`${router.pathname}`);
          return;
        }

        const queryParams = { ...router.query } as Record<
          string,
          string
        >;

        queryParams.domainId =
          filteredDomain?.[0]?.domainID;

        const searchParams = new URLSearchParams(
          queryParams
        );
        router.push(
          `${router.pathname}?${searchParams.toString()}`
        );
      }
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .deletedWebsiteSuccess
        ) as string,
      });
    },
  });

  const deletePermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:website:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:website:update'],
    ],
  });

  const onWebsiteAction = (
    domain: CookieDomain,
    key: string
  ) => {
    switch (key) {
      case 'edit':
        toggle.edit(domain);
        return;
      case 'delete':
        toggle.remove(domain);
        return;
      case 'scan':
        scanCookies.submit(domain.domainID);
        showNotification({
          type: 'info',
          message: t(
            tokens.cookieManagement.notification
              .scanWebsite
          ) as string,
        });
        return;
      default:
        window.open(
          `${window.location.origin}/apps/datafence/cookie-management/${key}?domainId=${domain.domainID}`,
          '_blank'
        );
        break;
    }
  };

  const columns: ColumnsType<CookieDomain> = [
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.websites.name}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.websites.title}
        />
      ),
      dataIndex: 'site',
      key: 'site',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.websites.scanPage}
        />
      ),
      dataIndex: 'totalPageScan',
      key: 'totalPageScan',
      ellipsis: true,
      width: 300,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.websites.totalCookies
          }
        />
      ),
      dataIndex: 'cookies',
      key: 'cookies',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.websites.scanDate}
        />
      ),
      dataIndex: 'scanDate',
      key: 'scanDate',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id={tokens.common.status.title} />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (domain: CookieDomain) => (
        <DropdownTable
          menu={{
            items: [
              {
                label: (
                  <IntlMessage id={tokens.common.edit} />
                ),
                key: 'edit',
                icon: <EditOutlined />,
                disabled: !editPermission.isAllow,
              },
              {
                label: (
                  <IntlMessage
                    id={tokens.common.delete}
                  />
                ),
                key: 'delete',
                icon: <DeleteOutlined />,
                disabled: !deletePermission.isAllow,
              },
              {
                key: 'divider-action',
                type: 'divider',
              },
              {
                label: (
                  <IntlMessage
                    id={
                      tokens.cookieManagement.websites
                        .scan
                    }
                  />
                ),
                key: 'scan',
                icon: <SearchOutlined />,
              },
              {
                label: (
                  <IntlMessage
                    id={
                      tokens.cookieManagement.scanReport
                        .title
                    }
                  />
                ),
                key: 'scan-report',
                icon: <SecurityScanOutlined />,
              },
              {
                key: 'divider-cookie',
                type: 'divider',
              },
              {
                key: 'dashboard',
                label: (
                  <IntlMessage
                    id={
                      tokens.cookieManagement.dashboard
                        .title
                    }
                  />
                ),
                icon: <DashboardOutlined />,
              },
              {
                key: 'cookies',
                label: (
                  <IntlMessage
                    id={
                      tokens.cookieManagement.cookies
                        .title
                    }
                  />
                ),
                icon: <CookieIconOutlined />,
              },
              {
                key: 'cookie-banner',
                label: (
                  <IntlMessage
                    id={
                      tokens.cookieManagement.cookieBanner
                        .title
                    }
                  />
                ),
                icon: <ProfileOutlined />,
              },
            ],
            onClick: (menuInfo) =>
              onWebsiteAction(domain, menuInfo.key),
          }}
        />
      ),
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <Flex>
            <Button
              onClick={() => refresh()}
              className="mr-1"
            >
              <ReloadOutlined spin={isRefreshing} />
            </Button>
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="domainID"
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          loading={isLoading}
          dataSource={data?.data}
          columns={filteredColumns}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </Card>
      <DomainEditModal
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        data={toggle.data}
      />
      <DeleteModal
        title={
          <IntlMessage
            id={tokens.cookieManagement.websites.delete}
          />
        }
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.name}
        onDelete={() =>
          deleteDomain.submit(toggle.data?.domainID)
        }
        okButtonProps={{
          loading: deleteDomain.isLoading,
        }}
      />
    </FallbackError>
  );
};
