import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {
  Ranking,
  RankingScore,
  RankingMeta,
} from '../../types/assessment';

export type RankingReportTableProps = {
  loading?: boolean;
  ranking?: Ranking;
  meta?: RankingMeta[];
};

const getRankColor = (rank: number) => {
  if (rank <= 20) {
    return '#de4436';
  } else if (rank <= 40) {
    return '#ff6b72';
  } else if (rank <= 60) {
    return '#f0853e';
  } else if (rank <= 80) {
    return '#ffc542';
  } else {
    return '#04d182';
  }
};

const getColumns = (
  meta: RankingMeta[]
): ColumnsType<RankingScore> => {
  const columns: ColumnsType<RankingScore> = [
    {
      title: 'อันดับ',
      key: 'order',
      width: 50,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'สังกัด',
      dataIndex: 'name',
      width: 350,
    },
  ];

  meta.forEach((m) => {
    columns.push({
      title: m.value,
      align: 'center',
      render: (ranking) => {
        const value = ranking[m.key];
        if (ranking.key === 'avg') {
          return `${value.toFixed(2)}%`;
        }
        return (
          <Typography.Text
            style={{ color: getRankColor(value) }}
          >
            {value.toFixed(2)}%
          </Typography.Text>
        );
      },
    });
  });

  columns.push({
    title: 'คะแนนเฉลี่ย',
    dataIndex: 'avg',
    align: 'center',
    width: 150,
    render: (value) => `${value.toFixed(2)}%`,
  });

  return columns;
};

export const RankingReportTable = ({
  loading,
  ranking,
  meta,
}: RankingReportTableProps) => {
  const dataSource = ranking
    ? [
        ...ranking.scores,
        { ...ranking.avgHorizontal, key: 'avg' },
      ]
    : [];

  return (
    <div
      className={css`
        padding-top: 24px;

        .ant-table-container {
          border-bottom-left-radius: 8px;
        }

        .ant-table-tbody {
          tr > td:last-child {
            color: #455560 !important;

            font-weight: bold;
          }

          tr:nth-child(odd) {
            background-color: #fff;
          }

          tr:nth-child(even) {
            background-color: #f5f5f5;
          }

          tr:last-child {
            td {
              background-color: #fff;
            }

            td:first-child {
              border-right: 0 !important;
              color: white;
              border-bottom-left-radius: 8px;
            }

            td:nth-child(n + 3) {
              font-weight: bold;
              border-right: rgba(
                255,
                107,
                114,
                0.3
              ) !important;
              border-left: rgba(
                255,
                107,
                114,
                0.3
              ) !important;
              background-color: rgba(255, 107, 114, 0.3);
            }

            td:last-child {
              background-color: #fff;
              border-right: 1px solid #f0f0f0 !important;
              border-bottom-right-radius: 8px;
            }
          }
        }
      `}
    >
      <Table
        loading={loading}
        rowKey="key"
        columns={getColumns(meta ?? [])}
        dataSource={dataSource}
        bordered
        pagination={false}
      />
    </div>
  );
};
