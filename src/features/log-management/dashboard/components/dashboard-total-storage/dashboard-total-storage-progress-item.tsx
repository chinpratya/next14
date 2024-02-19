import { css } from '@emotion/css';
import { Typography } from 'antd';

import { convertBytesToSize } from '@/utils';

type DashboardTotalStorageProgressItemProps = {
  value: number;
  color: string;
  totalStorage: number;
};

export const DashboardTotalStorageProgressItem = ({
  value,
  color,
  totalStorage,
}: DashboardTotalStorageProgressItemProps) => {
  const getWidth = (value: number) => {
    const width = (value / totalStorage) * 100;
    return width < 0.5 ? 0.5 : width;
  };

  return (
    <span
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 500;
        width: ${getWidth(value)}%;
        height: 100%;
        background-color: ${color};
      `}
    >
      {getWidth(value) >= 10 && (
        <Typography.Text
          style={{
            maxWidth: '100%',
            color: '#ffffff',
          }}
          ellipsis={{
            tooltip: convertBytesToSize(value as number),
          }}
        >
          {convertBytesToSize(value as number)}
        </Typography.Text>
      )}
    </span>
  );
};
