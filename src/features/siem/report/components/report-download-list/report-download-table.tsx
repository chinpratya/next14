import { FilePdfOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';

import { ReportDownload } from '../../types';

type ReportDownloadTableProps = {
  loading?: boolean;
  dataSource?: ReportDownload[];
  page: number;
  onDownload?: (path: string) => void;
};

export const ReportDownloadTable = ({
  dataSource,
  loading,
  page,
  onDownload,
}: ReportDownloadTableProps) => {
  const columns: ColumnsType<ReportDownload> = [
    {
      key: 'no',
      title: (
        <IntlMessage id="logManagement.report.dowloadList.no" />
      ),
      align: 'center',
      width: 70,
      render: (value, item, index) => (
        <Typography.Text>
          {(page - 1) * 10 + index + 1}
        </Typography.Text>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.report.dowloadList.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="logManagement.report.dowloadList.status" />
      ),
      dataIndex: 'status_report',
      key: 'status',
      align: 'center',
      render: (status: string) => (
        <ShowTagStatus
          items={[
            {
              label: 'Waiting',
              key: 'Pending',
              color: '#FFC542',
            },
            {
              label: 'Done',
              key: 'Closed',
              color: '#704AFF',
            },
            {
              label: 'Error',
              key: 'Error',
              color: '#FF6B72',
            },
          ]}
          status={status}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.createdDate" />
      ),
      key: 'createdDate',
      dataIndex: 'created_date',
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.report.dowloadList.expired" />
      ),
      key: 'expired',
      align: 'center',
      dataIndex: 'expired_date',
      render: (date: string) => (
        <ShowTagDate
          date={dayjs(date).year() < 2000 ? null : date}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.report.dowloadList.explore" />
      ),
      key: 'explore',
      dataIndex: 'path',
      align: 'center',
      render: (path: string) => (
        <FilePdfOutlined
          className={css`
            font-size: 24px;
            color: ${!!path ? '#ff9a5d' : '#000'};
            pointer-events: ${!!path ? 'unset' : 'none'};
          `}
          onClick={() => onDownload?.(path)}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={false}
    />
  );
};
