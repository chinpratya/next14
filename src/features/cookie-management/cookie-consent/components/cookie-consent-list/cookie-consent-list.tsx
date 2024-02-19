import { UploadOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import {
  useColumnFiltered,
  useFilter,
  usePagination,
  useRangePicker,
  useSearch,
} from '@/hooks';
import { tokens } from '@/lang';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useExportCookieConsent } from '../../api/export-cookie-consent';
import { useGetCookieConsentMeta } from '../../api/get-cookie-consent-meta';
import { useListCookieConsent } from '../../api/list-cookie-consent';
import { CookieConsent } from '../../types';

export const CookieConsentList = () => {
  const { search, debouncedSearch, onSearch } =
    useSearch();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { filters, columnFilter, filterDropdown } =
    useFilter<CookieConsent>();

  const { startDate, endDate, RangePicker } =
    useRangePicker({
      disabledFuture: true,
    });

  const exportCookieConsent = useExportCookieConsent({
    search: debouncedSearch,
    startDate,
    endDate,
    filters,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
  });

  const { data, isLoading, isError } =
    useListCookieConsent({
      search: debouncedSearch,
      page,
      pageSize,
      filters,
      startDate,
      endDate,
    });

  const meta = useGetCookieConsentMeta();

  const columns: ColumnsType<CookieConsent> = [
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .consentId
          }
        />
      ),
      dataIndex: 'consentID',
      key: 'consentID',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.cookieManagement.cookieConsent.name}
        />
      ),
      dataIndex: 'PurposeName',
      key: 'PurposeName',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.PurposeName?.map((consent) => {
        return {
          text: consent?.name,
          value: consent?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('PurposeName'),
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .identifyType
          }
        />
      ),
      dataIndex: 'IdentifyType',
      key: 'IdentifyType',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .dataSubject
          }
        />
      ),
      dataIndex: 'dataSubject',
      key: 'dataSubject',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent.position
          }
        />
      ),
      dataIndex: 'position',
      key: 'position',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent.consent
          }
        />
      ),
      key: 'consent',
      width: 280,
      ...columnFilter('filter'),
      filters: meta.data?.Consent.map((consent) => {
        return {
          text: consent?.name,
          value: consent?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('consent'),
      render: ({ consent, isCurrent }) => (
        <Flex>
          <ShowTagStatus
            status={consent}
            items={[
              {
                label:
                  tokens.cookieManagement.cookieConsent
                    .consentAccept,
                key: 'accept',
                color: SUCCESS_COLOR,
              },
              {
                label:
                  tokens.cookieManagement.cookieConsent
                    .consentReject,
                key: 'reject',
                color: ERROR_COLOR,
              },
              {
                label:
                  tokens.cookieManagement.cookieConsent
                    .consentWithdraw,
                key: 'withdraw',
                color: ERROR_COLOR,
              },
            ]}
          />
          {isCurrent && (
            <ShowTagStatus
              item={{
                label:
                  tokens.cookieManagement.cookieConsent
                    .consentCurrent,
                key: 'current',
                color: '#06AED4',
              }}
            />
          )}
        </Flex>
      ),
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .consentForm
          }
        />
      ),
      dataIndex: 'consentForm',
      key: 'consentForm',
      ellipsis: true,
      width: 250,
      ...columnFilter('filter'),
      filters: meta.data?.consentForm.map((consent) => {
        return {
          text: consent?.name,
          value: consent?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('consentForm'),
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .collectionMethod
          }
        />
      ),
      dataIndex: 'CollectionMethod',
      key: 'CollectionMethod',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent.channel
          }
        />
      ),
      dataIndex: 'channel',
      key: 'channel',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.cookieManagement.cookieConsent
              .timestamp
          }
        />
      ),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
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
        title={
          <>
            <IntlMessage
              id={
                tokens.cookieManagement.cookieConsent
                  .listTitle
              }
            />
            <Typography.Text
              className="ml-2"
              style={{
                fontSize: 14,
                fontWeight: 'normal',
              }}
            >
              {data?.totalRecord ?? 0}{' '}
              <IntlMessage id={tokens.common.items} />
            </Typography.Text>
          </>
        }
        extra={
          <>
            <RangePicker className="mr-2" />
            <Button
              icon={<UploadOutlined />}
              className="mr-2"
              onClick={() => exportCookieConsent.submit()}
              loading={exportCookieConsent.isLoading}
            >
              <IntlMessage id={tokens.common.export} />
            </Button>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="consentID"
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          loading={isLoading}
          dataSource={data?.data ?? []}
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
    </FallbackError>
  );
};
