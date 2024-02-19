import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Badge, Card, Typography } from 'antd';
import _ from 'lodash';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { TemplateRiskScorePoint } from '../../types';
import {
  TemplateRiskSettingScoreLabel,
  TemplateRiskSettingScoreLabelProps,
} from '../template-risk-setting-score/template-risk-setting-score-label';

export type TemplateRiskSettingScoreTableProps =
  TemplateRiskSettingScoreLabelProps & {
    templateRiskScorePoint?: TemplateRiskScorePoint[];
    loading: boolean;
  };

export const TemplateRiskSettingScoreTable = ({
  templateRiskScorePoint = [],
  loading,
  ...TemplateRiskSettingScoreLabelProps
}: TemplateRiskSettingScoreTableProps) => {
  const maxX = Math.max(
    ...templateRiskScorePoint?.map((point) => point.X)
  );
  const maxY = Math.max(
    ...templateRiskScorePoint?.map((point) => point.Y)
  );

  const arrayX = Array.from(
    { length: maxX + 1 },
    (_, index) => index
  );
  const arrayY = Array.from(
    {
      length: maxY + 1,
    },
    (_, index) => index
  );

  return (
    <Card
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate
              .exampleTitle
          }
        />
      }
      loading={loading}
      className={css`
        .ant-card-head {
          border-bottom: 1px solid #e0e0e0;
          min-height: 60px;
        }
      `}
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="w-100"
      >
        <Flex
          justify="space-between"
          align="center"
          className="w-100 mb-4"
          gap={8}
          wrap="wrap"
        >
          <div>
            <Typography.Title
              level={5}
              className="m-0"
              style={{ fontSize: 16 }}
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .impact
                }
              />
            </Typography.Title>
            <Typography.Title
              level={5}
              className="m-0"
              style={{ fontSize: 14 }}
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .impactSeverity
                }
              />
            </Typography.Title>
          </div>
          <table
            className={css`
              tr > td {
                width: 95px;

                div {
                  padding: 3px 0;
                  height: 30px;
                  text-align: center;
                }
              }
            `}
          >
            <tbody>
              {arrayX
                ?.reverse()
                ?.map((pointX: number) => {
                  return (
                    <tr
                      key={`risk-matrix-score-table-${pointX}`}
                    >
                      {arrayY.map((pointY: number) => {
                        const cellData = _.find(
                          templateRiskScorePoint,
                          {
                            X: pointX,
                            Y: pointY,
                          }
                        );

                        if (pointX === 0 && pointY === 0)
                          return (
                            <td
                              key={`risk-matrix-score-table-${pointX}-${pointY}`}
                            ></td>
                          );

                        if (
                          pointX === 0 ||
                          pointY === 0
                        ) {
                          return (
                            <td
                              key={`risk-matrix-score-table-${pointX}-${pointY}`}
                            >
                              <div
                                style={{
                                  backgroundColor:
                                    '#f5f5f5',
                                }}
                              >
                                <Typography.Title
                                  level={5}
                                  className="mb-0"
                                >
                                  {pointX === 0
                                    ? pointY
                                    : pointX}
                                </Typography.Title>
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={`risk-matrix-score-table-${pointX}-${pointY}`}
                          >
                            <div
                              style={{
                                backgroundColor:
                                  cellData?.color,
                              }}
                              className={
                                cellData?.isSelect
                                  ? `risk-matrix-score-table-selected`
                                  : `risk-matrix-score-table-selected`
                              }
                            >
                              <Typography.Title
                                level={5}
                                className="mb-0"
                              >
                                {cellData?.isSelect ? (
                                  <Badge
                                    count={
                                      cellData?.value
                                    }
                                    color="#3364fe"
                                    style={{
                                      borderColor:
                                        '#3364fe',
                                      minWidth: 30,
                                    }}
                                  />
                                ) : (
                                  cellData?.value
                                )}
                              </Typography.Title>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <Typography.Title
              level={5}
              className="m-0"
              style={{ fontSize: 16 }}
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .scoreTitle
                }
              />
            </Typography.Title>
            <TemplateRiskSettingScoreLabel
              direction="column"
              {...TemplateRiskSettingScoreLabelProps}
            />
          </div>
        </Flex>
        <Typography.Title
          level={5}
          className="m-0"
          style={{ fontSize: 16 }}
        >
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .probability
            }
          />
        </Typography.Title>
        <Typography.Title
          level={5}
          className="m-0"
          style={{ fontSize: 14 }}
        >
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .riskRanking
            }
          />
        </Typography.Title>
      </Flex>
    </Card>
  );
};
