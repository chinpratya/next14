import {
  ApartmentOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  FileDoneOutlined,
  GoldOutlined,
  NotificationOutlined,
  TeamOutlined,
  TrophyOutlined,
  DashboardOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AiOutlineTags } from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH,
  DATAFENCE_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH}`;

export const dataMappingItem: NavigationType[] = [
  {
    label: 'dataMapping.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:datamap:dashboard:read'],
    ],
  },
  {
    label: 'dataMapping.dataController.title',
    key: `${path}/data-controller`,
    icon: <DeploymentUnitOutlined />,
    permissions: [
      permissions['pdpakit:datamap:dataprocessor:read'],
    ],
  },
  {
    label: 'dataMapping.elements.title',
    key: `${path}/elements`,
    icon: <ClusterOutlined />,
    permissions: [
      permissions['pdpakit:datamap:elements:read'],
    ],
  },
  {
    label: 'dataMapping.dataCategories.title',
    key: `${path}/data-categories`,
    icon: <ApartmentOutlined />,
    permissions: [
      permissions['pdpakit:datamap:categories:read'],
    ],
  },
  {
    label: 'dataMapping.purpose.title',
    key: `${path}/purpose`,
    icon: <TrophyOutlined />,
    permissions: [
      permissions['pdpakit:datamap:purpose:read'],
    ],
  },
  {
    label: 'dataMapping.asset.title',
    key: `${path}/asset`,
    icon: <GoldOutlined />,
    permissions: [
      permissions['pdpakit:datamap:asset:read'],
    ],
  },
  {
    label: 'dataMapping.organization.title',
    key: `${path}/organization`,
    icon: <UserOutlined />,
    permissions: [
      permissions['pdpakit:datamap:organization:read'],
    ],
  },
  {
    label: 'dataMapping.activity.title',
    key: `${path}/activity`,
    icon: <NotificationOutlined />,
    permissions: [
      permissions['pdpakit:datamap:activity:read'],
    ],
  },
  {
    label: 'dataMapping.dataLifecycle.title',
    key: `${path}/data-lifecycle`,
    icon: <FileDoneOutlined />,
    permissions: [
      permissions['pdpakit:datamap:lifecycle:read'],
    ],
  },
  {
    label: 'dataMapping.group.title',
    key: `${path}/group`,
    icon: <TeamOutlined />,
    permissions: [
      permissions['pdpakit:datamap:group:read'],
    ],
  },
  {
    label: 'dataMapping.ropa.title',
    key: `${path}/ropa`,
    icon: <EditOutlined />,
    permissions: [
      permissions['pdpakit:datamap:ropa:read'],
    ],
  },
  {
    label: 'dataMapping.tags.title',
    key: `${path}/tags`,
    icon: <AiOutlineTags />,
    permissions: [
      permissions['pdpakit:datamap:tag:read'],
    ],
  },
];

const getPermissions = async (
  key: string,
  moduleName: string
) => {
  const permissionStore =
    authStore.getState().permissions;

  if (!permissionStore || !permissionStore[key]) {
    const data = await listPermission({
      productName: 'pdpakit',
      moduleName,
    });
    authStore.setState({
      permissions: {
        ...authStore.getState().permissions,
        ...data,
      },
    });

    return data[key] ?? [];
  }

  return permissionStore?.[key] ?? [];
};

export const dataMappingNavigation = async () => {
  const permissions = await getPermissions(
    'datamap',
    'datamap'
  );

  return onFilterNavigation(dataMappingItem, permissions);
};
