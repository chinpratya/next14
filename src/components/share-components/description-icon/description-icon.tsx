import { css } from '@emotion/css';
import { Typography } from 'antd';
import { ReactNode } from 'react';

import { PRIMARY_COLOR } from '@/config/color';
import { Flex } from '@components/flex';

export type DescriptionIconProps = {
  icon: JSX.Element | ReactNode;
  label: string | ReactNode;
  data?: string | ReactNode;
  color?: string;
};

export const DescriptionIcon = ({
  icon,
  label,
  data,
  color = PRIMARY_COLOR,
}: DescriptionIconProps) => {
  return (
    <Flex flexDirection="column" justifyContent="start">
      <Typography.Text
        className={css`
          font-weight: bold;
          cursor: pointer;

          .anticon {
            color: ${color};
          }
        `}
      >
        {icon} {label} :{' '}
      </Typography.Text>
      <Typography.Text type="secondary" className="ml-3">
        {data}
      </Typography.Text>
    </Flex>
  );
};
