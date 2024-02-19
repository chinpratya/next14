import { FileOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';

import { convertBytesToSize } from '@/utils';

type DashboardTotalStorageItemProps = {
  label: string;
  value: number;
  color: string;
};

export const DashboardTotalStorageItem = ({
  label,
  value,
  color,
}: DashboardTotalStorageItemProps) => {
  const convertHexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.1)`;
  };

  return (
    <>
      <div
        className={css`
          width: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px;
          background-color: ${color};
          color: #fff;
          border-radius: 4px;
          margin-right: 4px;
        `}
      >
        <FileOutlined />
      </div>

      <Flex
        direction="column"
        justify="center"
        className={css`
          width: 110px;
        `}
      >
        <Typography.Text
          className={css`
            font-size: 17px;
            font-weight: 500;
            color: ${color} !important;
          `}
        >
          {convertBytesToSize(value as number)}
        </Typography.Text>
        <Typography.Text
          className={css`
            font-size: 10px;
            font-weight: 500;
            max-width: 100%;
          `}
          ellipsis={{ tooltip: label }}
        >
          {label}
        </Typography.Text>
      </Flex>
    </>
  );
};
