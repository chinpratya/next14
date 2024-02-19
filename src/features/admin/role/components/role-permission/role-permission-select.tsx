import {
  Checkbox,
  Divider,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import { useFilter } from '@/hooks';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RolePermissionApp,
  RolePermissionPage,
} from '../../types';

export type RolePermissionSelectProps = {
  selectedPlatform: string;
  rolePermissionApps?: RolePermissionApp[];
  selectedPermissions?: string[];
  onChange?: (permissionKey: string) => void;
};

const getPagePermission = (
  rolePermissionApps: RolePermissionApp[],
  selectedPlatform: string,
  search?: string
): RolePermissionPage[] | undefined => {
  if (!rolePermissionApps || !selectedPlatform)
    return undefined;
  if (rolePermissionApps.length === 0) return undefined;
  const selectedApp = rolePermissionApps.find(
    (rolePermissionApp) =>
      rolePermissionApp?.children?.find(
        (rolePermissionModule) =>
          rolePermissionModule.name === selectedPlatform
      )
  );
  if (!selectedApp) return undefined;
  const selectedModule = selectedApp.children?.find(
    (rolePermissionModule) =>
      rolePermissionModule.name === selectedPlatform
  );
  if (!selectedModule) return undefined;
  if (search) {
    return selectedModule.children?.filter(
      (rolePermissionPage) =>
        rolePermissionPage.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        rolePermissionPage.description
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }
  return selectedModule?.children ?? undefined;
};

const PermissionCheckbox = ({
  permissionId,
  onChange,
  selectedPermissions,
}: {
  permissionId: string;
  onChange?: (permissionId: string) => void;
  selectedPermissions?: string[];
}) => (
  <Checkbox
    disabled={!permissionId}
    checked={selectedPermissions?.includes(permissionId)}
    onChange={() =>
      permissionId && onChange?.(permissionId)
    }
  />
);

export const RolePermissionSelect = ({
  selectedPlatform,
  rolePermissionApps = [],
  selectedPermissions = [],
  onChange,
}: RolePermissionSelectProps) => {
  const { filters, columnFilter, filterDropdown } =
    useFilter<RolePermissionPage>();
  const columns: ColumnsType<RolePermissionPage> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.menu" />
      ),
      key: 'name',
      width: 250,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('name', 'search'),
      render: (permission: RolePermissionPage) => (
        <DescriptionBlock
          title={permission.name}
          description={
            <Typography.Text type="secondary">
              <IntlMessage id="admin.businessSetting.role.permission.description" />
              : {permission.description}
            </Typography.Text>
          }
          divider={false}
          bottomClassName="mb-0"
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.view" />
      ),
      key: 'view',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'read', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.add" />
      ),
      key: 'add',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'create', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.delete" />
      ),
      key: 'delete',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'delete', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.edit" />
      ),
      key: 'edit',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'update', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.import" />
      ),
      key: 'import',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'import', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.permission.export" />
      ),
      key: 'export',
      width: 75,
      align: 'center',
      dataIndex: ['children', 'export', 'permissionId'],
      render: (permissionId: string) => (
        <PermissionCheckbox
          permissionId={permissionId}
          onChange={onChange}
          selectedPermissions={selectedPermissions}
        />
      ),
    },
  ];

  const dataSources = useMemo(
    () =>
      getPagePermission(
        rolePermissionApps,
        selectedPlatform,
        filters?.name as string
      ),
    [rolePermissionApps, selectedPlatform, filters]
  );

  console.log('dataSources', dataSources);
  const capitalizeFirstLetter = (str: string) => {
    const text = `${
      str === 'datamap' ? 'datamapping' : str
    }`;

    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <>
      <Divider
        className="mb-5"
        orientation="left"
        orientationMargin="0"
      >
        {selectedPlatform && selectedPlatform !== ''
          ? `${capitalizeFirstLetter(selectedPlatform)} `
          : null}
      </Divider>
      <Table
        rowKey="name"
        columns={columns}
        dataSource={dataSources ?? []}
        expandable={{
          childrenColumnName: 'subChildren',
        }}
        pagination={false}
      />
    </>
  );
};
