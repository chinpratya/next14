import {
  BookOutlined,
  DashboardOutlined,
  // FileTextOutlined,
  // ProfileOutlined,
} from '@ant-design/icons';
import { AiOutlineTags } from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_POLICY_AND_NOTICE_MANAGEMENT_PATH,
  DATAFENCE_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_POLICY_AND_NOTICE_MANAGEMENT_PATH}`;

export const policyManagementItem: NavigationType[] = [
  {
    label: 'policyManagement.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:policy:dashboard:read'],
    ],
  },
  {
    label: 'policyManagement.policy.title',
    key: `${path}/policy`,
    icon: <BookOutlined />,
    permissions: [
      permissions['pdpakit:policy:document:read'],
    ],
  },
  // {
  //   label: 'policyManagement.tasks.title',
  //   key: `${path}/tasks`,
  //   icon: <FileTextOutlined />,
  // },
  // {
  //   label: 'policyManagement.assessments.title',
  //   key: `${path}/assessments`,
  //   icon: <ProfileOutlined />,
  // },
  {
    label: 'policyManagement.tag.title',
    key: `${path}/tags`,
    icon: <AiOutlineTags />,
    permissions: [permissions['pdpakit:policy:tag:read']],
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

export const policyManagementNavigation = async () => {
  const permissions = await getPermissions(
    'policy',
    'policy'
  );

  return onFilterNavigation(
    policyManagementItem,
    permissions
  );
};
