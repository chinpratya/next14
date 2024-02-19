import { css } from '@emotion/css';
import { ReactNode } from 'react';

import { PRIMARY_COLOR } from '@/config/color';

export type IconBackgroundProps = {
  icon: ReactNode;
  color?: string;
  size?: number;
};

export const IconBackground = ({
  icon,
  color = PRIMARY_COLOR,
  size = 28,
}: IconBackgroundProps) => {
  return (
    <div
      className={css`
        color: ${color};
        background-color: ${color}33;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        width: ${size}px;
        height: ${size}px;
        margin-right: 0.5em;
      `}
    >
      {icon}
    </div>
  );
};
