import { Card, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Flex } from '@/components/share-components/flex';
import {
  ERROR_COLOR,
  SUCCESS_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import {
  useColumnFiltered,
  usePagination,
} from '@/hooks';
import { tokens } from '@/lang';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityDetailConsent } from '../../api/list-activity-detail-consent';
import { ActivityConsent } from '../../types';

export type ActivityDetailConsentListProps = {
  activityId: string;
};

export const ActivityDetailConsentList = ({
  activityId,
}: ActivityDetailConsentListProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListActivityDetailConsent({
      activityId,
      page,
      pageSize,
    });

  const columns: ColumnsType<ActivityConsent> = [
    {
      title: (
        <IntlMessage id="consentManagement.receipts.receiptsId" />
      ),
      key: 'receiptsID',
      ellipsis: true,
      width: 200,
      render: (receipt) => (
        <Typography.Text>
          {receipt?.receiptsID}
        </Typography.Text>
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
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.owner" />
      ),
      key: 'identify',
      dataIndex: 'identify',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.status" />
      ),
      key: 'status',
      width: 280,
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
      width: 150,
      render: (verify: boolean) =>
        verify ? 'ยืนยัน' : 'รอการยืนยัน',
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.collectionPoint" />
      ),
      key: 'collectionPoint',
      dataIndex: 'collectionPoint',
      ellipsis: true,
      width: 200,
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
    },
    {
      title: (
        <IntlMessage id="consentManagement.receipts.activityGroup" />
      ),
      key: 'activityGroup',
      dataIndex: 'activityGroup',
      ellipsis: true,
      width: 200,
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
        <IntlMessage id="dataMapping.activity.dsar.tagName" />
      ),
      key: 'tags',
      width: 200,
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

  const { filteredColumns, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: [
        'receiptsID',
        'dataSubjectID',
        'email',
      ],
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.consent.title" />
        }
        extra={ColumnTransfer}
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          rowKey="receiptsID"
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          pagination={false}
        />
        <Pagination
          total={data?.totalRecord ?? 0}
          onChange={onPaginationChange}
          pageSize={pageSize}
          current={page}
        />
      </Card>
    </FallbackError>
  );
};
