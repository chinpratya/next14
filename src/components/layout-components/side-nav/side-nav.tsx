import { Layout, Skeleton } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_DARK,
  NAV_TYPE_SIDE,
} from '@/config/theme';
import { useTheme } from '@/stores/theme';

import { MenuContent } from '../menu-content';

const { Sider } = Layout;

export type SideNavProps = {
  routeInfo: string[];
  hideGroupTitle?: boolean;
  loading?: boolean;
};

export const SideNav = ({
  routeInfo,
  hideGroupTitle,
  loading,
}: SideNavProps) => {
  const { navCollapsed, sideNavTheme } = useTheme();
  const props = {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
  };
  return (
    <Sider
      className={`side-nav ${
        sideNavTheme === SIDE_NAV_DARK
          ? 'side-nav-dark'
          : ''
      }`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      {loading ? (
        <Skeleton
          className="pt-5 px-3"
          paragraph={{ rows: 10 }}
        />
      ) : (
        <Scrollbars autoHide>
          <MenuContent type={NAV_TYPE_SIDE} {...props} />
        </Scrollbars>
      )}
    </Sider>
  );
};
