import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import {
  AssessmentSubmissionRanking,
  AssessmentSubmissionRankingMeta,
  AssessmentSubmissionRankingScore,
} from '../../types';

export type AssessmentSubmissionRankingReportTableProps =
  {
    loading?: boolean;
    ranking?: AssessmentSubmissionRanking;
    meta?: AssessmentSubmissionRankingMeta[];
    reportType?: string;
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
  meta: AssessmentSubmissionRankingMeta[],
  reportType: string
): ColumnsType<AssessmentSubmissionRankingScore> => {
  const columns: ColumnsType<AssessmentSubmissionRankingScore> =
    [
      {
        title: 'อันดับ',
        key: 'order',
        width: 50,
        align: 'center',
        render: (_, __, index) => index + 1,
      },
      {
        title: 'องค์กร',
        dataIndex: 'organizationName',
        width: 150,
      },
    ];

  if (reportType !== 'allOrganization') {
    columns.push(
      // {
      //   title: 'H Code',
      //   dataIndex: 'hcode',
      //   width: 80,
      //   render: (value) => `${value}`,
      // },
      {
        title: 'สาขา/หน่วยงาน',
        dataIndex: 'branchName',
        width: 150,
        render: (value) => `${value}`,
      }
    );
  }

  meta.forEach((m) => {
    columns.push({
      title: (
        <Typography.Text style={{}}>
          {m.value}
        </Typography.Text>
      ),
      align: 'center',
      render: (ranking) => {
        const value = ranking[m.key];
        if (ranking.key === 'avg') {
          return `${value?.toFixed(2)}%`;
        }
        return (
          <Typography.Text
            style={{ color: getRankColor(value) }}
          >
            {value?.toFixed(2)}%
          </Typography.Text>
        );
      },
    });
  });

  columns.push({
    title: 'ค่าเฉลี่ย',
    dataIndex: 'avg',
    align: 'center',
    width: 150,
    render: (value) => `${value?.toFixed(2)}%`,
  });

  return columns;
};

export const AssessmentSubmissionRankingReportTable = ({
  loading,
  ranking,
  meta,
  reportType = '',
}: AssessmentSubmissionRankingReportTableProps) => {
  const [dataSource, setDataSource] = useState<
    Record<string, unknown>[]
  >([]);

  // const getAvgLabel = () => {
  //   switch (reportType) {
  //     case 'allOrganization':
  //       return `ค่าเฉลี่ยจาก ${dataSource.length} องค์กร`;
  //     case 'allHospital':
  //       return `ค่าเฉลี่ยจาก ${dataSource.length} โรงพยาบาล`;
  //   }
  //   return 'ค่าเฉลี่ย';
  // };

  useEffect(() => {
    if (ranking) {
      let value = ranking?.scores;
      if (reportType !== 'allOrganization') {
        value = ranking?.scores.filter(
          (item) => item.is_branch === true
        );
      }
      setDataSource(value ?? []);
    }
  }, [ranking, reportType]);

  return (
    <div
      className={css`
        padding-top: 16px;

        .ant-table-container {
          border-bottom-left-radius: 8px;
        }

        .ant-table-thead > tr > th {
          text-align: left !important;
          max-height: 400px;
          vertical-align: bottom;

          :nth-child(1),
          :nth-child(2),
          :last-child {
            /* vertical-align: bottom; */
            transform: unset;
            writing-mode: unset;
          }

          :nth-child(1),
          :last-child {
            text-align: center !important;
          }
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

          /* tr:last-child {
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
          } */
        }
      `}
    >
      <Table
        tableLayout="fixed"
        loading={loading}
        rowKey="key"
        columns={getColumns(meta ?? [], reportType)}
        dataSource={dataSource}
        bordered
        scroll={{ x: true }}
        pagination={false}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell
                className="text-center font-weight-bold"
                colSpan={
                  reportType === 'allOrganization' ? 2 : 4
                }
                index={0}
              >
                {ranking?.avgHorizontal.name}
              </Table.Summary.Cell>
              {meta?.map((item, index) => {
                const value =
                  ranking?.avgHorizontal?.[item.key];
                return (
                  <Table.Summary.Cell
                    colSpan={1}
                    index={index + 1}
                    key={index + 1}
                    className={css`
                      font-weight: bold;
                      background-color: #ffd3d5;
                      text-align: center;
                    `}
                  >
                    <Typography.Text>
                      {value?.toFixed(2)}%
                    </Typography.Text>
                  </Table.Summary.Cell>
                );
              })}
              <Table.Summary.Cell
                className="text-center font-weight-bold"
                colSpan={1}
                index={99}
              >
                {ranking?.avgHorizontal.avg.toFixed(2)}%
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </div>
  );
};
