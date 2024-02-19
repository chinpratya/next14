import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Badge, Typography } from 'antd';
import _ from 'lodash';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskMatrixScorePoint } from '../../../types';

import {
  RiskMatrixScoreResolutionLabel,
  RiskMatrixScoreResolutionLabelProps,
} from './risk-matrix-score-resolution-label';

export type RiskMatrixScoreTableProps =
  RiskMatrixScoreResolutionLabelProps & {
    riskMatrixScorePoint?: RiskMatrixScorePoint[];
  };

export const RiskMatrixScoreTable = ({
  riskMatrixScorePoint = [],
  ...riskMatrixScoreResolutionLabelProps
}: RiskMatrixScoreTableProps) => {
  const maxX = Math.max(
    ...riskMatrixScorePoint?.map((point) => point.X)
  );
  const maxY = Math.max(
    ...riskMatrixScorePoint?.map((point) => point.Y)
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
              id={tokens.dataBreach.riskMatrix.impact}
            />
          </Typography.Title>
          <Typography.Title
            level={5}
            className="m-0"
            style={{ fontSize: 14 }}
          >
            <IntlMessage
              id={
                tokens.dataBreach.riskMatrix
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
            {arrayX?.reverse()?.map((pointX: number) => {
              return (
                <tr
                  key={`risk-matrix-score-table-${pointX}`}
                >
                  {arrayY.map((pointY: number) => {
                    const cellData = _.find(
                      riskMatrixScorePoint,
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

                    if (pointX === 0 || pointY === 0) {
                      return (
                        <td
                          key={`risk-matrix-score-table-${pointX}-${pointY}`}
                        >
                          <div
                            style={{
                              backgroundColor: '#f5f5f5',
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
                                count={cellData?.value}
                                color="#3364fe"
                                style={{
                                  borderColor: '#3364fe',
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
              id={tokens.dataBreach.riskMatrix.scoreTitle}
            />
          </Typography.Title>
          <RiskMatrixScoreResolutionLabel
            direction="column"
            {...riskMatrixScoreResolutionLabelProps}
          />
        </div>
      </Flex>
      <Typography.Title
        level={5}
        className="m-0"
        style={{ fontSize: 16 }}
      >
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.probability}
        />
      </Typography.Title>
      <Typography.Title
        level={5}
        className="m-0"
        style={{ fontSize: 14 }}
      >
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.riskRanking}
        />
      </Typography.Title>
    </Flex>
  );
};
