import { useSetState } from '@mantine/hooks';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useEffect, useState } from 'react';

import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
} from '@/config/theme';
import { getNavigation } from '@/navigations';
import { useTheme } from '@/stores/theme';
import { NavigationType } from '@/types';
import utils from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export type MenuContentProps = {
  type?: string;
  hideGroupTitle?: boolean;
  topNavColor?: string;
};

const getMenuItem = (
  items: NavigationType[]
): ItemType[] =>
  items.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        label: <IntlMessage id={item.label} />,
        icon: item.icon,
        type: item.type,
        children: getMenuItem(item.children),
      };
    }
    return {
      key: item.key,
      label: <IntlMessage id={item.label} />,
      icon: item.icon,
      type: item.type,
    };
  });

const getDefaultOpenKeys = (
  navigations: NavigationType[]
): string[] => {
  const defaultOpenKeys: string[] = [];
  navigations.forEach((nav) => {
    if (nav.children) {
      defaultOpenKeys.push(nav.key);
      defaultOpenKeys.push(
        ...getDefaultOpenKeys(nav.children)
      );
    }
  });
  return defaultOpenKeys;
};

const SideNavContent = ({
  hideGroupTitle,
}: MenuContentProps) => {
  const { sideNavTheme } = useTheme();

  const router = useRouter();

  const [menu, setMenu] = useSetState<{
    item: ItemType[];
    navigation: NavigationType[];
    openKeys: string[] | undefined;
  }>({
    item: [],
    navigation: [],
    openKeys: undefined,
  });

  const navigation = useCallback(
    () => getNavigation(router.pathname, router.query),
    [router]
  );

  const onNavigation = ({ key }: MenuInfo) => {
    const menuNav = _.find(menu.navigation, {
      key,
    });
    router.push({
      pathname: key,
      query: menuNav?.query ?? undefined,
    });
  };

  const onOpenChange = (openKeys: string[]) => {
    setMenu({
      openKeys,
    });
  };

  useEffect(() => {
    const loadNavigation = async () => {
      const navigationList = await navigation();
      setMenu({
        item: getMenuItem(navigationList),
        navigation: navigationList,
        openKeys:
          menu?.openKeys ??
          getDefaultOpenKeys(navigationList),
      });
    };

    loadNavigation().then();
  }, [menu.openKeys, navigation, router, setMenu]);
  return (
    <Menu
      mode="inline"
      theme={
        sideNavTheme === SIDE_NAV_LIGHT ? 'light' : 'dark'
      }
      style={{ height: '100%', borderRight: 0 }}
      selectedKeys={utils.navigateSelectedKeys(
        router.pathname
      )}
      className={hideGroupTitle ? 'hide-group-title' : ''}
      items={menu.item}
      onClick={onNavigation}
      onOpenChange={onOpenChange}
      triggerSubMenuAction="hover"
    />
  );
};

const TopNavContent = () => {
  const { topNavColor } = useTheme();
  const router = useRouter();
  const [items, setItems] = useState<NavigationType[]>(
    []
  );

  useEffect(() => {
    const loadNavigation = async () => {
      const navigation = await getNavigation(
        router.pathname,
        router.query
      );
      setItems(navigation);
    };

    loadNavigation();
  }, [router]);

  return (
    <Menu
      mode="horizontal"
      style={{ backgroundColor: topNavColor }}
      items={items}
    />
  );
};

export const MenuContent = (props: MenuContentProps) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent />
  );
};
