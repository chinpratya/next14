import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { ReactNode } from 'react';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';

type DashboardOverviewCardProps = {
  title: string | ReactNode;
  value: string;
  backgroundColor?: string;
  loading?: boolean;
  refreshing?: boolean;
};

export const DashboardOverviewCard = ({
  title,
  value,
  loading,
  refreshing = false,
  backgroundColor,
}: DashboardOverviewCardProps) => {
  return (
    <Card
      loading={loading}
      title={
        <Typography.Text className="font-weight-semibold">
          {title}
        </Typography.Text>
      }
      className={css`
        height: 122px;
        margin-bottom: 0;
        background-color: ${backgroundColor} !important;

        .ant-typography {
          color: #ffffff;
        }
      `}
    >
      <LoadingOverlay visible={refreshing} />
      <Typography.Text
        strong
        className={css`
          font-size: 30px;
        `}
      >
        {value}
      </Typography.Text>
    </Card>
  );
};
