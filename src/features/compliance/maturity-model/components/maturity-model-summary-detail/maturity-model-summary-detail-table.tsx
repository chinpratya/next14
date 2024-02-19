import { css } from '@emotion/css';
import { Card, Empty } from 'antd';
import Image from 'next/image';

import { MaturityModelDetail } from '../../types';

export type MaturityModelSummaryDetailTableProps = {
  maturityModels?: MaturityModelDetail[];
};

export const MaturityModelSummaryDetailTable = ({
  maturityModels,
}: MaturityModelSummaryDetailTableProps) => {
  if (!maturityModels || maturityModels.length === 0) {
    return <Empty />;
  }

  return (
    <div
      className={css`
        overflow-x: auto;
        padding-bottom: 24px;
        min-height: calc(100vh - 404px);
      `}
    >
      <table
        className={css`
          border-collapse: separate;
          border-spacing: 0;

          thead > tr > th {
            padding: 16px;
            font-size: 16px;
            border: 1px solid #e6ebf1;
            width: ${maturityModels.length / 100}%;
            min-width: 250px;
            border-collapse: separate !important;

            :first-child {
              border-top-left-radius: 0.625rem;
            }

            :last-child {
              border-top-right-radius: 0.625rem;
            }

            :not(:last-child) {
              border-right: 0;
            }
          }

          tbody > tr > td {
            border: 1px solid #e6ebf1;

            :not(:last-child) {
              border-right: 0;
            }
          }

          tbody > tr:nth-child(1) > td {
            padding: 8px;
            border-top: 0;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
          }

          tbody > tr:nth-child(2) > td {
            padding: 18px;
            vertical-align: top;
            border-top: 0;

            :first-child {
              border-bottom-left-radius: 0.625rem;
            }

            :last-child {
              border-bottom-right-radius: 0.625rem;
            }

            ul {
              padding-left: 16px;
            }

            .ant-card-body {
              padding: 8px;
            }
          }
        `}
      >
        <thead>
          <tr>
            {maturityModels?.map((maturityModel) => (
              <th key={maturityModel.ObjectUUID}>
                <Image
                  width={18}
                  height={18}
                  src={maturityModel.icon}
                  alt=""
                  className="mr-2"
                />
                {maturityModel.columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {maturityModels?.map((maturityModel) => (
              <td key={maturityModel.ObjectUUID}>
                {maturityModel.columnDetail}
              </td>
            ))}
          </tr>
          <tr>
            {maturityModels?.map((maturityModel) => (
              <td key={maturityModel.ObjectUUID}>
                {maturityModel?.description && (
                  <Card>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: maturityModel.description,
                      }}
                    />
                  </Card>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
