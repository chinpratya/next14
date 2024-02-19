import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  GREEN_PRIMARY_COLOR,
  GREY_PRIMARY_COLOR,
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

import { useListActivityDetailDsar } from '../../api/list-activity-detail-dsar';
import { ActivityDsar } from '../../types';

export type ActivityDetailDsarListProps = {
  activityId: string;
};

export const ActivityDetailDsarList = ({
  activityId,
}: ActivityDetailDsarListProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListActivityDetailDsar({
      activityId,
      page,
      pageSize,
    });

  const columns: ColumnsType<ActivityDsar> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.requestId" />
      ),
      dataIndex: 'requestID',
      key: 'requestID',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.typeOfRequest" />
      ),
      dataIndex: 'typeOfRequest',
      key: 'typeOfRequest',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.identifyType" />
      ),
      dataIndex: 'identifyType',
      key: 'identifyType',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.identify" />
      ),
      dataIndex: 'identify',
      key: 'identify',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.activityName" />
      ),
      dataIndex: 'activityName',
      key: 'activityName',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.workflowName" />
      ),
      dataIndex: 'workflowName',
      key: 'workflowName',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.requestStatus" />
      ),
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      width: 130,
      render: (requestStatus) => (
        <ShowTagStatus
          status={requestStatus}
          items={[
            {
              label: tokens.common.on,
              key: 'opened',
              color: GREEN_PRIMARY_COLOR,
            },
            {
              label: tokens.common.off,
              key: 'close',
              color: GREY_PRIMARY_COLOR,
            },
            {
              label: tokens.common.status.inProgress,
              key: 'in_progress',
              color: PROCESSING_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.numberOfEnd" />
      ),
      dataIndex: 'numberOfEnd',
      key: 'numberOfEnd',
      width: 180,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.endDate" />
      ),
      dataIndex: 'endDate',
      key: 'endDate',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.timeReminded" />
      ),
      dataIndex: 'timeReminded',
      key: 'timeReminded',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dsar.tagName" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      width: 200,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
  ];

  const { filteredColumns, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.dsar.title" />
        }
        extra={ColumnTransfer}
      >
        <Table
          rowKey="ObjectUUID"
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          pagination={false}
        />
        <Pagination
          total={data?.totalRecord ?? 0}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
