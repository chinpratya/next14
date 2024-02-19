import { css } from '@emotion/css';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Fragment } from 'react';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';

import { ReportTable } from '../../types';

type DashboardTableProps = {
  data: ReportTable;
  loading?: boolean;
};

export const DashboardTable = ({
  data,
  loading,
}: DashboardTableProps) => {
  return (
    <>
      {Object.entries(data).map(([key, value], index) => {
        const columns: ColumnsType<
          Record<string, unknown>
        > = [
          {
            title: (
              <IntlMessage id="logManagement.indices.title" />
            ),
            children: [
              {
                key: 'name',
                title: (
                  <IntlMessage id="logManagement.dashboard.fileName" />
                ),
                ellipsis: true,
                dataIndex: 'name',
              },
            ],
          },
          {
            title: key,
            align: 'left',
            children: [
              {
                key: 'path',
                ellipsis: true,
                title: (
                  <IntlMessage id="logManagement.dashboard.path" />
                ),
                dataIndex: 'path',
              },
              {
                key: 'type',
                title: (
                  <IntlMessage id="logManagement.dashboard.type" />
                ),
                dataIndex: 'type',
                align: 'center',
                width: 100,
                render: (type: string) => (
                  <IntlMessage
                    id={`logManagement.${type.toLowerCase()}`}
                  />
                ),
              },
              {
                key: 'expirationDate',
                title: (
                  <IntlMessage id="logManagement.dashboard.expirationDate" />
                ),
                dataIndex: 'expire_date',
                align: 'center',
                render: (date: string) => (
                  <ShowTagDate date={date} />
                ),
              },
            ],
          },
        ];

        return (
          <Fragment key={key}>
            <Table
              rowKey="path"
              bordered
              className={css`
                .ant-table table {
                  border-top: ${index !== 0 &&
                  '0 !important'};
                }

                .ant-table-thead > tr > th {
                  background-color: #f7f7f8;
                }

                .ant-table-tbody > tr > td {
                  padding: 15px;
                }

                .ant-table-container,
                .ant-table-container
                  table
                  > thead
                  > tr:first-child
                  th:first-child {
                  border-top-left-radius: ${index === 0
                    ? '0.625rem'
                    : '0'};
                }

                .ant-table-container
                  table
                  > thead
                  > tr:first-child
                  th:last-child {
                  border-top-right-radius: ${index === 0
                    ? '0.625rem'
                    : '0'};
                }
              `}
              dataSource={
                value.length > 10
                  ? value.slice(0, 10)
                  : value
              }
              columns={columns}
              loading={loading}
              pagination={false}
            />
          </Fragment>
        );
      })}
    </>
  );
};
