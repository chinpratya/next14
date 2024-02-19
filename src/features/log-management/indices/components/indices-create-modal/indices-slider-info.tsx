import { css } from '@emotion/css';
import { Typography } from 'antd';

import { Flex } from '@/components/share-components/flex';

type IndicesSliderInfoProps = {
  label: string;
  value: number;
  backgroundColor?: string;
  className?: string;
};

export const IndicesSliderInfo = ({
  label,
  value,
  backgroundColor,
  className,
}: IndicesSliderInfoProps) => {
  return (
    <Flex
      justifyContent="between"
      className={`${css`
        padding: 3px 9px;
        background-color: ${backgroundColor
          ? backgroundColor
          : '#6691f6'};

        .ant-typography {
          color: #fff !important;
        }
      `}  ${className}`}
    >
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </Flex>
  );
};
