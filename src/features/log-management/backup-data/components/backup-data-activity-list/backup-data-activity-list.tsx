import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePagination } from '@/hooks';

import { useListActivity } from '../../api/list-activity';
import { BackupDataActivity } from '../../types';
import { BackupDataSeverityTag } from '../backup-data-severity-tag';

export const BackupDataActivityList = () => {
  const { query } = useRouter();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({ pageSize: 10 });

  const { data, isLoading, isError } = useListActivity({
    page,
    page_size: pageSize,
    backup_id: query.backupDataId as string,
  });

  const columns: ColumnsType<BackupDataActivity> = [
    {
      key: 'time',
      title: <IntlMessage id="logManagement.time" />,
      dataIndex: 'created_date',
      render: (time: string) => (
        <ShowTagDate date={time} />
      ),
    },
    {
      key: 'activity',
      title: (
        <IntlMessage id="logManagement.backupData.activity" />
      ),
      dataIndex: 'status',
      align: 'center',
      // sorter: true,
      render: (status: string) => (
        <BackupDataSeverityTag status={status} />
      ),
    },
    {
      key: 'message',
      title: <IntlMessage id="logManagement.message" />,
      dataIndex: 'message',
    },
  ];

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.backupData.activity" />
        }
      >
        <Table
          rowKey="backup_id"
          loading={isLoading}
          dataSource={data?.data}
          columns={columns}
          // showSorterTooltip={false}
          // onChange={(page, filter, sort) =>
          //   console.log(sort)
          // }
          pagination={false}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
