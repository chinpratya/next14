import { css } from '@emotion/css';
import { ReactNode } from 'react';

export type ActionWrapperProps = {
  children: ReactNode;
};

export const ActionWrapper = ({
  children,
}: ActionWrapperProps) => {
  return (
    <div
      className={css`
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        align-content: center;

        .anticon {
          cursor: pointer;

          :hover {
            color: #1890ff;
          }
        }

        .icon-add {
          :hover {
            color: #52c41a;
          }
        }

        .icon-delete {
          :hover {
            color: #ff4d4f;
          }
        }
      `}
    >
      {children}
    </div>
  );
};
