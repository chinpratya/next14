import { UploadOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  ERROR_COLOR,
  SUCCESS_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useFilter,
  useRangePicker,
} from '@/hooks';
import { tokens } from '@/lang';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useExportReceipt } from '../../api/export-receipt';
import { useGetReceiptMeta } from '../../api/get-receipt-meta';
import { useListReceipt } from '../../api/list-receipt';
import { Receipt } from '../../types';

export type ReceiptListProps = {
  onEdit?: (receipt: Receipt) => void;
};

export const ReceiptList = ({
  onEdit,
}: ReceiptListProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { filters, columnFilter, filterDropdown } =
    useFilter<Receipt>();

  const { startDate, endDate, RangePicker } =
    useRangePicker({
      disabledFuture: true,
    });

  const exportReceipt = useExportReceipt({
    search: debouncedSearch,
    startDate,
    endDate,
    filters,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
  });

  const { data, isLoading, isError } = useListReceipt({
    page,
    pageSize,
    search: debouncedSearch,
    filters,
    startDate,
    endDate,
  });

  const meta = useGetReceiptMeta();

  const columns: ColumnsType<Receipt> = [
    {
      title: (
        <IntlMessage id="consentManagement.receipts.receiptsId" />
      ),
      key: 'receiptsID',
      ellipsis: true,
      width: 200,
      render: (receipt) => (
        <Typography.Link
          onClick={() => onEdit?.(receipt)}
        >
          {receipt?.receiptsID}
        </Typography.Link>
      ),
      ...columnFilter('search'),
      filterDropdown: filterDropdown(
        'receiptsID',
        'search'
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.dataSubjectId" />
      ),
      key: 'type',
      dataIndex: 'type',
      ellipsis: true,
      width: 150,
      ...columnFilter('filter'),
      filters: meta.data?.dataSubjectType?.map((type) => {
        return {
          text: type?.name,
          value: type?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('type'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.owner" />
      ),
      key: 'identify',
      dataIndex: 'identify',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.dataSubject?.map((identify) => {
        return {
          text: identify?.name,
          value: identify?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('identify'),
      render: (identify: string) =>
        identify !== '' ? identify : '-',
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.tel" />
      ),
      key: 'tel',
      dataIndex: 'tel',
      ellipsis: true,
      width: 150,
      render: (tel: string) => (tel !== '' ? tel : '-'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.status" />
      ),
      key: 'status',
      width: 280,
      ...columnFilter('filter'),
      filters: meta.data?.isAccept.map((consent) => {
        return {
          text: consent?.name,
          value: consent?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('consent'),
      render: ({ status, isCurrent }) => (
        <Flex>
          <ShowTagStatus
            status={status}
            items={[
              {
                label: tokens.common.status.allConsent,
                key: 'all',
                color: SUCCESS_COLOR,
              },
              {
                label: tokens.common.status.someConsent,
                key: 'some',
                color: PROCESSING_COLOR,
              },
              {
                label: tokens.common.status.rejectConsent,
                key: 'reject',
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
        <IntlMessage id="consentManagement.receipts.verify" />
      ),
      key: 'verify',
      dataIndex: 'verify',
      ellipsis: true,
      width: 180,
      ...columnFilter('filter'),
      filters: meta.data?.isVerify?.map((verify) => {
        return {
          text: verify?.name,
          value: verify?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('verify'),
      render: (verify: boolean) =>
        verify ? (
          <IntlMessage id="consentManagement.receipts.verify.true" />
        ) : (
          <IntlMessage id="consentManagement.receipts.verify.false" />
        ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.collectionPoint" />
      ),
      key: 'collectionPoint',
      dataIndex: 'collectionPoint',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.consentForm?.map(
        (collectionPoint) => {
          return {
            text: collectionPoint?.name,
            value: collectionPoint?.ObjectUUID,
          };
        }
      ),
      filterDropdown: filterDropdown('collectionPoint'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.version" />
      ),
      key: 'version',
      dataIndex: 'version',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.collectionMethod" />
      ),
      key: 'CollectionMethod',
      dataIndex: 'CollectionMethod',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.collectionMethod?.map(
        (CollectionMethod) => {
          return {
            text: CollectionMethod?.name,
            value: CollectionMethod?.name,
          };
        }
      ),
      filterDropdown: filterDropdown('CollectionMethod'),
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
        <IntlMessage id="consentManagement.receipts.policyName" />
      ),
      key: 'policyName',
      dataIndex: 'policyName',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.policy?.map((policyName) => {
        return {
          text: policyName?.name,
          value: policyName?.name,
        };
      }),
      filterDropdown: filterDropdown('policyName'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.policyVersion" />
      ),
      key: 'policyVersion',
      dataIndex: 'policyVersion',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.activity" />
      ),
      key: 'activity',
      dataIndex: 'activity',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.activity?.map((activity) => {
        return {
          text: activity?.name,
          value: activity?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('activity'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.activityGroup" />
      ),
      key: 'activityGroup',
      dataIndex: 'activityGroup',
      ellipsis: true,
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.activityGroup?.map(
        (activityGroup) => {
          return {
            text: activityGroup?.name,
            value: activityGroup?.ObjectUUID,
          };
        }
      ),
      filterDropdown: filterDropdown('activityGroup'),
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.dataController" />
      ),
      key: 'dataController',
      dataIndex: 'dataController',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.timestamp" />
      ),
      key: 'timestamp',
      dataIndex: 'timestamp',
      ellipsis: true,
      width: 200,
      render: (expiryDate) => (
        <ShowTagDate date={expiryDate} />
      ),
    },
    {
      title: <IntlMessage id={tokens.common.note} />,
      key: 'notes',
      dataIndex: 'massage',
      ellipsis: true,
      width: 300,
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.tag" />
      ),
      key: 'tags',
      width: 200,
      ...columnFilter('filter'),
      filters: meta.data?.tag?.map((tags) => {
        return {
          text: tags?.name,
          value: tags?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('tags'),
      render: (receipt) => (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {receipt?.tagName?.map((tag: string) => (
            <Tag key={tag} className="mr-2">
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="consentManagement.receipts.table.title" />
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
              onSearch={onSearch}
              className="mr-2"
            />
            <Button
              icon={<UploadOutlined />}
              className="mr-1"
              onClick={() => exportReceipt.submit()}
              loading={exportReceipt.isLoading}
            >
              <IntlMessage id="consentManagement.receipts.export" />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          pagination={false}
          dataSource={data?.data}
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
