import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';

import { formatNumber } from '@/utils';

type DashboardTypesOfIndicatorsListProps = {
  data: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
};

export const DashboardTypesOfIndicatorsList = ({
  data,
}: DashboardTypesOfIndicatorsListProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      className="mt-5"
      gap={24}
    >
      {data.map((item) => (
        <Flex key={item.id} align="center">
          <span
            className={css`
              display: block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: ${item.color};
              margin-right: 8px;
            `}
          />
          <Typography.Text
            className={css`
              width: 130px;
              padding-right: 8px;
              color: #72849a;
            `}
            ellipsis={{ tooltip: item.label }}
          >
            {item.label}
          </Typography.Text>
          <Typography.Text strong>
            {formatNumber(item.value)}
          </Typography.Text>
        </Flex>
      ))}
    </Flex>
  );
};
