import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import {
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import {
  useColumnFiltered,
  useFilter,
  usePagination,
  useSearch,
  useRangePicker,
} from '@/hooks';
import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useExportTransaction } from '../../api/export-transection';
import { useGetMetaTransaction } from '../../api/get-meta-transaction';
import { useListTransaction } from '../../api/list-transaction';
import { Transaction } from '../../types';

export type TransactionListProps = {
  onEdit?: (transaction: Transaction) => void;
};

export const TransactionList = ({
  onEdit,
}: TransactionListProps) => {
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const { startDate, endDate, RangePicker } =
    useRangePicker({
      disabledFuture: true,
    });

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { filters, columnFilter, filterDropdown } =
    useFilter<Transaction>();

  const exportTransaction = useExportTransaction({
    search: debouncedSearch,
    startDate,
    endDate,
    filters,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
  });

  const { data, isLoading, isError } = useListTransaction(
    {
      page,
      pageSize,
      search: debouncedSearch,
      filters,
      startDate,
      endDate,
    }
  );

  const { data: meta } = useGetMetaTransaction();

  const columns: ColumnsType<Transaction> = [
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.purposeId" />
      ),
      key: 'purposeID',
      ellipsis: true,
      width: 200,
      ...columnFilter('search'),
      filterDropdown: filterDropdown(
        'purposeID',
        'search'
      ),
      render: (transaction: Transaction) => (
        <Typography.Link
          onClick={() => onEdit?.(transaction)}
        >
          {transaction?.purposeID}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.purposeName" />
      ),
      key: 'purposeName',
      dataIndex: 'purposeName',
      ellipsis: true,
      width: 200,
      filters: meta?.purpose?.map((current) => ({
        text: current.name,
        value: current.ObjectUUID,
      })),
      ...columnFilter(),
      filterDropdown: filterDropdown('purpose'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.receiptId" />
      ),
      key: 'consentReceiptsID',
      dataIndex: 'consentReceiptsID',
      ellipsis: true,
      width: 200,
      ...columnFilter('search'),
      filterDropdown: filterDropdown(
        'consentReceiptsID',
        'search'
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.type" />
      ),
      key: 'dataSubject',
      dataIndex: 'dataSubject',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.dataSubjectIdentifier" />
      ),
      key: 'type',
      dataIndex: 'type',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.dataSubject" />
      ),
      key: 'identify',
      dataIndex: 'identify',
      ellipsis: true,
      width: 150,
      ...columnFilter(),
      filters: _.uniqBy(meta?.dataSubject, 'name')?.map(
        (value) => ({
          text: value.name,
          value: value.name,
        })
      ),
      filterDropdown: filterDropdown('dataSubject'),
      render: (identify: string) =>
        identify !== '' ? identify : '-',
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.tel" />
      ),
      key: 'tel',
      dataIndex: 'tel',
      ellipsis: true,
      width: 150,
      render: (tel: string) => (tel !== '' ? tel : '-'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.status" />
      ),
      key: 'status',
      width: 250,
      filters: meta?.isAccept?.map((current) => ({
        text: current.name,
        value: current.ObjectUUID,
      })),
      ...columnFilter(),
      filterDropdown: filterDropdown('isAccept'),
      render: ({ status, isCurrent }) => (
        <Flex>
          <ShowTagStatus
            status={status}
            items={[
              {
                label: tokens.common.status.acceptConsent,
                key: 'accept',
                color: SUCCESS_COLOR,
              },
              {
                label: tokens.common.status.rejectConsent,
                key: 'reject',
                color: ERROR_COLOR,
              },
              {
                label:
                  tokens.common.status.withdrawConsent,
                key: 'withdraw',
                color: ERROR_COLOR,
              },
            ]}
          />
          {isCurrent && (
            <ShowTagStatus
              item={{
                label: tokens.common.status.current,
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
        <IntlMessage id="consentManagement.transaction.table.verify" />
      ),
      key: 'verify',
      dataIndex: 'verify',
      ellipsis: true,
      width: 180,
      filters: meta?.isVerify?.map((current) => ({
        text: current.name,
        value: current.ObjectUUID,
      })),
      ...columnFilter(),
      filterDropdown: filterDropdown('isVerify'),
      render: (verify: boolean) =>
        verify ? (
          <IntlMessage id="consentManagement.transaction.table.verify.true" />
        ) : (
          <IntlMessage id="consentManagement.transaction.table.verify.false" />
        ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.collectionPoint" />
      ),
      key: 'collectionPoint',
      dataIndex: 'collectionPoint',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.version" />
      ),
      key: 'version',
      dataIndex: 'version',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.activity" />
      ),
      key: 'activity',
      dataIndex: 'activity',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.collectionMethod" />
      ),
      key: 'CollectionMethod',
      dataIndex: 'CollectionMethod',
      ellipsis: true,
      width: 200,
    },
    {
      title: <IntlMessage id={tokens.common.channel} />,
      key: 'channel',
      dataIndex: 'channel',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.policy" />
      ),
      key: 'policyName',
      dataIndex: 'policyName',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.version" />
      ),
      key: 'policyVersion',
      dataIndex: 'policyVersion',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.activityGroup" />
      ),
      key: 'activityGroup',
      dataIndex: 'activityGroup',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.purposeGroup" />
      ),
      key: 'purposeGroup',
      dataIndex: 'purposeGroup',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.consentDuration" />
      ),
      key: 'duration',
      dataIndex: 'duration',
      ellipsis: true,
      width: 200,
      render: (duration) => {
        return (
          <>
            {duration?.day > '0' ? (
              <span>
                {`${duration?.day}`}
                <IntlMessage id="consentManagement.transaction.table.consentDuration.day" />
              </span>
            ) : null}
            {duration?.month > '0' ? (
              <span>
                {`${duration?.month} `}
                <IntlMessage id="consentManagement.transaction.table.consentDuration.month" />
              </span>
            ) : null}
            {duration?.year > '0' ? (
              <span>
                {`${duration?.year}`}
                <IntlMessage id="consentManagement.transaction.table.consentDuration.year" />
              </span>
            ) : null}
            {duration?.day === '0' &&
            duration?.month === '0' &&
            duration?.year === '0'
              ? duration?.description
              : null}
          </>
        );
      },
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.expiryDt" />
      ),
      key: 'expiryDate',
      dataIndex: 'expiryDate',
      ellipsis: true,
      width: 200,
      render: (expiryDate) => (
        <ShowTagDate date={expiryDate} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.publicDt" />
      ),
      key: 'publicDt',
      dataIndex: 'publicDt',
      ellipsis: true,
      width: 200,
      render: (publicDt) => (
        <ShowTagDate date={publicDt} />
      ),
    },
    {
      title: <IntlMessage id={tokens.common.note} />,
      key: 'note',
      dataIndex: 'note',
      ellipsis: true,
      width: 300,
    },
    {
      title: (
        <IntlMessage id="consentManagement.transaction.table.tagName" />
      ),
      key: 'tagName',
      dataIndex: 'tagName',
      width: 200,
      ...columnFilter(),
      filters: _.uniqBy(meta?.tag, 'name').map(
        (value) => ({
          text: value.name,
          value: value.ObjectUUID,
        })
      ),
      filterDropdown: filterDropdown('tag'),
      render: (tags) =>
        tags?.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        )) ?? '-',
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
      disabledKeys: ['purposeID'],
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="consentManagement.transaction.table.title" />
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
            <RangePicker className="mr-1" />
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            <Button
              icon={<UploadOutlined />}
              className="mr-1"
              onClick={() => exportTransaction.submit()}
              loading={exportTransaction.isLoading}
            >
              <IntlMessage id="consentManagement.transaction.export" />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="purposeID"
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
          showSizeChanger
        />
      </Card>
    </FallbackError>
  );
};
