import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { ReactNode } from 'react';

export type NoDataCardProps = {
  title?: string | ReactNode;
  description?: string | ReactNode;
};

export const NoDataCard = ({
  title = 'ไม่มีข้อมูล',
  description,
}: NoDataCardProps) => {
  return (
    <Card
      className={css`
        .ant-card-body {
          height: 35vh;
          min-height: 500px;

          .content {
            text-align: center;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      `}
    >
      <div className="content">
        <Typography.Title
          level={3}
          type="secondary"
          className="font-weight-bold"
        >
          {title}
        </Typography.Title>
        {description ? (
          <Typography.Text type="secondary">
            {description}
          </Typography.Text>
        ) : null}
      </div>
    </Card>
  );
};
