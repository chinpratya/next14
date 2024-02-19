import {
  LeftSquareFilled,
  RightSquareFilled,
} from '@ant-design/icons';
import { css } from '@emotion/css';

export type ToggleCollageProps = {
  collapsed: boolean;
  width?: number;
  toggleCollapsed: () => void;
  hidden?: boolean;
};

export const ToggleCollage = ({
  collapsed,
  width = 300,
  toggleCollapsed,
  hidden = false,
}: ToggleCollageProps) => {
  return (
    <div
      hidden={hidden}
      className={css`
        position: fixed;
        top: 50%;
        right: ${!collapsed ? 0 : width}px;

        transform: translateY(-50%);
        z-index: 1000;
        cursor: pointer;

        .anticon {
          font-size: 18px;
        }
      `}
    >
      {!collapsed ? (
        <LeftSquareFilled
          onClick={() => toggleCollapsed()}
        />
      ) : (
        <RightSquareFilled
          onClick={() => toggleCollapsed()}
        />
      )}
    </div>
  );
};
