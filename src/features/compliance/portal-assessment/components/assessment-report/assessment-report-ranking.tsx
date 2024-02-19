import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  AssessmentSubmissionRanking,
  AssessmentSubmissionRankingMeta,
  AssessmentSubmissionRankingScore,
} from '../../../assessment-submission/types';

export type AssessmentRankingReportProps = {
  loading?: boolean;
  ranking?: AssessmentSubmissionRanking;
  meta?: AssessmentSubmissionRankingMeta[];
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
  meta: AssessmentSubmissionRankingMeta[]
): ColumnsType<AssessmentSubmissionRankingScore> => {
  const columns: ColumnsType<AssessmentSubmissionRankingScore> =
    [
      {
        title: (
          <IntlMessage id="compliancePortal.result.detail.report.index" />
        ),
        key: 'order',
        width: 50,
        align: 'center',
        render: (_, __, index) => index + 1,
      },
      {
        title: (
          <IntlMessage id="compliancePortal.result.detail.report.organization" />
        ),
        dataIndex: 'name',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="compliancePortal.result.detail.report.hcode" />
        ),
        key: 'hcode',
        dataIndex: 'hcode',
        width: 80,
        align: 'center',
      },
      {
        title: (
          <IntlMessage id="compliancePortal.result.detail.report.branchName" />
        ),
        dataIndex: 'branchName',
        width: 150,
      },
    ];

  meta.forEach((m) => {
    columns.push({
      title: m.value,
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
    title: (
      <IntlMessage id="compliancePortal.result.detail.report.avg" />
    ),
    dataIndex: 'avg',
    align: 'center',
    width: 150,
    render: (value) => `${value?.toFixed(2)}%`,
  });

  return columns;
};

export const AssessmentRankingReport = ({
  loading,
  ranking,
  meta,
}: AssessmentRankingReportProps) => {
  const dataSource = ranking
    ? [
        ...ranking.scores,
        // { ...ranking.avgHorizontal, key: 'avg' },
      ]
    : [];

  return (
    <>
      <Typography.Title
        level={4}
        className="font-weight-bold mt-5"
      >
        <IntlMessage id="compliancePortal.result.detail.report.averageOrg" />
      </Typography.Title>
      <div
        id="assessmentRakingReport"
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
          }
        `}
      >
        <Table
          tableLayout="fixed"
          loading={loading}
          rowKey="name"
          columns={getColumns(meta ?? [])}
          dataSource={dataSource}
          bordered
          scroll={{ x: true }}
          pagination={false}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell
                  className="text-center font-weight-bold"
                  colSpan={4}
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
    </>
  );
};
