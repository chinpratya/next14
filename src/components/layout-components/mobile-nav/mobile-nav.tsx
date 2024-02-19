import { ArrowLeftOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { NAV_TYPE_SIDE } from '@/config/theme';
import { useTheme } from '@/stores/theme';
import { Flex } from '@components/flex';

import { Logo } from '../logo';
import { MenuContent } from '../menu-content';

export type MobileNavProps = {
  routeInfo?: string;
  hideGroupTitle?: boolean;
};

export const MobileNav = ({
  routeInfo,
  hideGroupTitle,
}: MobileNavProps) => {
  const { sideNavTheme, mobileNav, onMobileNavToggle } =
    useTheme();

  const menuContentProps = {
    sideNavTheme,
    routeInfo,
    hideGroupTitle,
  };

  const onClose = () => onMobileNavToggle(false);

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex
          justifyContent="between"
          alignItems="center"
        >
          <Logo mobileLogo={true} />
          <div
            className="nav-close"
            onClick={() => onClose()}
          >
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          <Scrollbars autoHide>
            <MenuContent
              type={NAV_TYPE_SIDE}
              {...menuContentProps}
            />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};
