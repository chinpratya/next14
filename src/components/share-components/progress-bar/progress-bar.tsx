import { css } from '@emotion/css';
import { Typography } from 'antd';

import { PRIMARY_COLOR } from '@/config/color';

export type ProgressBarProps = {
  current: number;
  total: number;
  width?: number;
};

export const ProgressBar = ({
  current,
  total,
  width = 150,
}: ProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div
      className={css`
        width: ${width}px;
        border: 2px solid #1b2531;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        gap: 5px;
        background: linear-gradient(
          to right,
          ${PRIMARY_COLOR}75 ${progress}%,
          #fff ${progress}%
        );
      `}
    >
      <div className="bg" />
      <Typography.Text strong>{current}</Typography.Text>
      <Typography.Text strong>of</Typography.Text>
      <Typography.Text strong>{total}</Typography.Text>
    </div>
  );
};
