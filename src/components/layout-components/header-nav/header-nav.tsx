import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';

import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '@/config/theme';
import { useTheme } from '@/stores/theme';
import utils from '@/utils';

import { Logo } from '../logo';
import { NavLanguage } from '../nav-language';
import { NavModule } from '../nav-module';
import { NavOrganization } from '../nav-organization';
import { NavProfile } from '../nav-profile';

const { Header } = Layout;

export type HeaderNavProps = {
  isMobile: boolean;
  navSideEnable?: boolean;
  navLeftChildren?: React.ReactNode;
};
export const HeaderNav = ({
  isMobile,
  navSideEnable = true,
  navLeftChildren,
}: HeaderNavProps) => {
  const {
    currentTheme,
    navCollapsed,
    mobileNav,
    navType,
    headerNavColor,
    toggleCollapsedNav,
    onMobileNavToggle,
  } = useTheme();

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed);
    } else {
      onMobileNavToggle(!mobileNav);
    }
  };

  const isNavTop = navType === NAV_TYPE_TOP;

  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === 'dark' ? '#00000' : '#ffffff'
      );
    }
    return utils.getColorContrast(headerNavColor);
  };

  const navMode = mode();

  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return '0px';
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div
        className={`app-header-wrapper ${
          isNavTop ? 'layout-top-nav' : ''
        }`}
      >
        <Logo
          logoType={navMode}
          navSideEnable={navSideEnable}
        />
        <div
          className="nav"
          style={{
            width: `calc(100% - ${getNavWidth()})`,
          }}
        >
          <div className="nav-left">
            {navSideEnable ? (
              <div
                className="nav-item"
                onClick={onToggle}
              >
                <div className="d-flex align-items-center">
                  {navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined className="nav-icon" />
                  ) : (
                    <MenuFoldOutlined className="nav-icon" />
                  )}
                </div>
              </div>
            ) : null}
            {navLeftChildren}
          </div>
          <div className="nav-right">
            <NavModule />
            <NavLanguage />
            <NavOrganization />
            <NavProfile />
          </div>
        </div>
      </div>
    </Header>
  );
};
