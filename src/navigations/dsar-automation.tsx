import {
  DashboardOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import {
  AiOutlineFileDone,
  AiOutlineTags,
} from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_DSAR_AUTOMATION_PATH,
  DATAFENCE_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DSAR_AUTOMATION_PATH}`;

export const dsarAutomationItem: NavigationType[] = [
  {
    label: 'dsarAutomation.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:dsar:dashboard:read'],
    ],
  },
  {
    label: 'dsarAutomation.request.title',
    key: `${path}/request`,
    icon: <SolutionOutlined />,
    permissions: [
      permissions['pdpakit:dsar:request:read'],
    ],
  },
  {
    label: 'dsarAutomation.task.title',
    key: `${path}/task`,
    icon: <AiOutlineFileDone />,
    permissions: [permissions['pdpakit:dsar:task:read']],
  },
  {
    label: 'dsarAutomation.setting.title',
    key: `${path}/setting`,
    icon: <SettingOutlined />,
    children: [
      {
        label: 'dsarAutomation.setting.webForm.title',
        key: `${path}/webform`,
        permissions: [
          permissions['pdpakit:dsar:webform:read'],
        ],
      },
      {
        label: 'dsarAutomation.setting.workflow.title',
        key: `${path}/workflow`,
        permissions: [
          permissions['pdpakit:dsar:workflow:read'],
        ],
      },
    ],
  },
  {
    label: 'dsarAutomation.tags.title',
    key: `${path}/tags`,
    icon: <AiOutlineTags />,
    permissions: [permissions['pdpakit:dsar:task:read']],
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

export const dsarAutomationNavigation = async () => {
  const permissions = await getPermissions(
    'dsar',
    'dsar'
  );

  return onFilterNavigation(
    dsarAutomationItem,
    permissions
  );
};
