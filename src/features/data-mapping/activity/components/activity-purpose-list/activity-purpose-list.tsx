import { Collapse, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { usePagination } from '@/hooks';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityUseAndPublishPurposeLifecycle } from '../../api/list-activity-use-and-publish-purpose-life-cycle';
import { ActivityPurposeList } from '../../types';

type ActivityPurposeListsProps = {
  activityId: string;
};

export const ActivityPurposeLists = ({
  activityId,
}: ActivityPurposeListsProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } =
    useListActivityUseAndPublishPurposeLifecycle({
      activityId,
      page,
      pageSize,
    });

  const columns: ColumnsType<ActivityPurposeList> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.purposeId" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.name" />
      ),
      key: 'purposeName',
      width: 200,
      render: (purpose: ActivityPurposeList) => (
        <span>{purpose.name}</span>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.legalBasis" />
      ),
      key: 'legalBasis',
      dataIndex: 'legalBasis',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.dataLifeCycle" />
      ),
      dataIndex: 'lifeCycle',
      key: 'lifeCycle',
      align: 'left',
      width: 150,
      render: (status: string[]) =>
        status.map((v: string) => {
          return (
            <div key={v} className="mx-2 my-2">
              <ShowTagStatus status={v} />
            </div>
          );
        }),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
  ];

  return (
    <Collapse defaultActiveKey={1}>
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.title" />
        }
        key="1"
      >
        <FallbackError isError={isError}>
          <Table
            rowKey="purposeID"
            loading={isLoading}
            columns={columns}
            dataSource={data?.data ?? []}
            pagination={false}
            scroll={{ x: 850 }}
            tableLayout="fixed"
          />
          <Pagination
            current={page}
            total={10}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </FallbackError>
      </Collapse.Panel>
    </Collapse>
  );
};
