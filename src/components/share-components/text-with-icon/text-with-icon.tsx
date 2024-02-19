import { css } from '@emotion/css';
import { Typography } from 'antd';
import { ReactNode } from 'react';

import { PRIMARY_COLOR } from '@/config/color';

export type TextWithIconProps = {
  tag: string;
  title?: string;
  icon: JSX.Element | ReactNode;
  color?: string;
  onClick?: () => void;
};

export const TextWithIcon = ({
  tag,
  title,
  icon,
  color = PRIMARY_COLOR,
  onClick,
}: TextWithIconProps) => {
  if (!onClick) {
    return (
      <Typography.Text
        className={css`
          cursor: pointer;
          .anticon {
            color: ${color};
          }
        `}
      >
        {icon} {tag} : {title}
      </Typography.Text>
    );
  }
  return (
    <Typography.Text
      className={css`
        cursor: pointer;
        .ant-typography {
          :hover {
            color: #3e79f7;
          }
        }
        .anticon {
          color: ${color};
        }
      `}
      onClick={onClick}
    >
      {icon} {tag} :{' '}
      <Typography.Text>{title}</Typography.Text>
    </Typography.Text>
  );
};
