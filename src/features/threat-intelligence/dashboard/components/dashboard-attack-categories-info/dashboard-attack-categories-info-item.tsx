import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import { formatNumber } from '@/utils';

type DashboardAttackCategoriesInfoItemProps = {
  name: string;
  count: number;
  color?: string;
};

export const DashboardAttackCategoriesInfoItem = ({
  name,
  count,
  color = '#704AFF',
}: DashboardAttackCategoriesInfoItemProps) => {
  return (
    <Card className="mb-0">
      <Typography.Title
        className={css`
          font-weight: 700 !important;
          margin-bottom: 10px !important;
          color: ${color} !important;
        `}
      >
        {formatNumber(count)}
      </Typography.Title>
      <Typography.Text style={{ color: '#72849A' }}>
        {name}
      </Typography.Text>
    </Card>
  );
};
