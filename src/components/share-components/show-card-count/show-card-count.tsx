import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import { Flex } from '@components/flex';

export type ShowCardCountProps = {
  number: number | string;
  icon: React.ReactNode;
  title: React.ReactNode | string;
  width?: string;
  color?: string;
  onClick?: () => void;
};

export const ShowCardCount = ({
  number,
  icon,
  title,
  width = '100%',
  color,
  onClick,
}: ShowCardCountProps) => {
  return (
    <Card
      className={css`
        width: ${width};
        margin: auto !important;
        color: ${color ? 'white' : 'black'} !important;
        cursor: pointer;
      `}
      style={{
        background: `${color ? color : 'white'}`,
      }}
      onClick={onClick}
    >
      <Flex
        justifyContent={'between'}
        alignItems="center"
      >
        <div>
          <div
            className={css`
              font-size: 1.8rem !important;
            `}
          >
            {icon}
          </div>
          <Typography.Text
            style={{
              color: `${color ? 'white' : 'white'}`,
            }}
          >
            {title}
          </Typography.Text>
        </div>
        <Typography.Text
          className={css`
            font-size: 2.8rem !important;
          `}
          style={{
            color: `${color ? 'white' : 'white'}`,
          }}
        >
          {number}
        </Typography.Text>
      </Flex>
    </Card>
  );
};
