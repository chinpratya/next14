import { Badge, Menu } from 'antd';
import type { MenuProps } from 'antd';
import _ from 'lodash';

import {
  RolePermissionApp,
  RolePermissionModule,
} from '../../types';

export type RolePermissionPlatformSelectProps = {
  selectedPlatform: string;
  onSelect?: (selectedPlatform: string) => void;
  rolePermissionApps?: RolePermissionApp[];
};

export const RolePermissionPlatformSelect = ({
  selectedPlatform,
  onSelect,
  rolePermissionApps = [],
}: RolePermissionPlatformSelectProps) => {
  const getModuleItem = (
    rolePermissionModules: RolePermissionModule[]
  ): MenuProps['items'] =>
    rolePermissionModules.map((rolePermission) => ({
      key: rolePermission.name,
      label: rolePermission.name,
    }));

  const getMenuItem = (
    rolePermissions: RolePermissionApp[]
  ): MenuProps['items'] =>
    rolePermissions.map((rolePermission) => ({
      key: rolePermission.name,
      label: rolePermission.name,
      icon: <Badge color="#3e79f7" />,
      children: rolePermission.children
        ? getModuleItem(rolePermission.children)
        : undefined,
    }));

  const menuItems = getMenuItem(rolePermissionApps);

  return (
    <Menu
      className="text-capitalize"
      mode="inline"
      items={menuItems}
      style={{ width: 250 }}
      selectedKeys={[selectedPlatform]}
      onSelect={({ key }) => onSelect?.(key.toString())}
      defaultOpenKeys={
        menuItems?.map(
          (item): string => _.get(item, 'key') as string
        ) ?? []
      }
    />
  );
};
