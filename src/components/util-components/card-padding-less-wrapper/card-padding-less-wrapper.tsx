import { css } from '@emotion/css';
import { Card } from 'antd';
import type { CardProps } from 'antd/lib/card';

export type CardPaddingLessWrapperProps = CardProps;

export const CardPaddingLessWrapper = ({
  children,
  ...rest
}: CardPaddingLessWrapperProps) => {
  return (
    <Card
      {...rest}
      className={css`
        .ant-card-head {
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 1px;

          .ant-card-head-wrapper {
            .ant-card-head-title,
            .ant-card-extra {
              padding-top: 15px;
              padding-bottom: 15px;
            }
          }
        }

        .ant-card-body {
          padding: 0;
        }

        .ant-table-wrapper {
          .ant-table-thead {
            display: none;
          }

          .ant-table-cell {
            border-bottom: none;
          }
        }
      `}
    >
      {children}
    </Card>
  );
};
