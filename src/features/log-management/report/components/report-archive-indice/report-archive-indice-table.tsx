import { css } from '@emotion/css';
import { Empty, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';

import {
  ArchiveIndice,
  ReportArchiveIndice,
} from '../../types';

type ReportArchiveIndiceTableProps = {
  data?: ReportArchiveIndice;
  loading?: boolean;
};

export const ReportArchiveIndiceTable = ({
  data,
  loading,
}: ReportArchiveIndiceTableProps) => {
  const columns: ColumnsType<ArchiveIndice> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.report.fileName" />
      ),
      width: 150,
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      key: 'path',
      title: (
        <IntlMessage id="logManagement.report.path" />
      ),
      width: 150,
      render: (data: ArchiveIndice) =>
        data.type === 'File' ? (
          '-'
        ) : (
          <Typography.Text>{data.path}</Typography.Text>
        ),
      ellipsis: true,
    },
    {
      key: 'type',
      title: (
        <IntlMessage id="logManagement.report.type" />
      ),
      width: 60,
      dataIndex: 'type',
    },
    {
      key: 'expirationDate',
      title: (
        <IntlMessage id="logManagement.report.expirationDate" />
      ),
      width: 100,
      dataIndex: 'expire_date',
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'description',
      title: (
        <IntlMessage id="logManagement.report.description" />
      ),
      width: 150,
      dataIndex: 'description',
      ellipsis: true,
      render: (value: string) => (!!value ? value : '-'),
    },
  ];

  return (
    <>
      {data ? (
        Object.entries(data).map(
          ([key, value], index) => (
            <Table
              rowKey="path"
              key={key}
              className={css`
                .ant-table-title {
                  padding: 12px 16px;
                  background-color: #f7f7f8;

                  ${index > 0 &&
                  ` border-top: 0 !important;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                  `}
                }

                .ant-table-thead > tr > th {
                  padding: 12px 16px;
                  background-color: #f7f7f8;
                }
              `}
              title={() => (
                <Typography.Text strong>
                  {key}
                </Typography.Text>
              )}
              bordered
              dataSource={value ?? []}
              columns={columns}
              loading={loading}
              pagination={false}
              scroll={{ x: 993 }}
            />
          )
        )
      ) : (
        <Empty />
      )}
    </>
  );
};
