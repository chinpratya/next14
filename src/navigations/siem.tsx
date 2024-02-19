import {
  DashboardOutlined,
  DotChartOutlined,
  WarningOutlined,
  ProfileOutlined,
  BellOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  CYBERFENCE_PATH,
  CYBERFENCE_SIEM_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_SIEM_PATH}`;

export const siemItem: NavigationType[] = [
  {
    label: 'logManagement.dashboard.title',
    key: `${path}/overview`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['cyber:siem:dashboard:read'],
    ],
  },
  {
    label: 'siem.subModule.incidentManagement',
    key: `${path}/incident-management`,
    icon: <DotChartOutlined />,
    permissions: [
      permissions['cyber:siem:incident:read'],
    ],
  },
  {
    label: 'siem.subModule.detectionRule',
    key: `${path}/detection-rule`,
    icon: <WarningOutlined />,
    permissions: [permissions['cyber:siem:rule:read']],
  },
  {
    label: 'siem.subModule.indices',
    key: `${path}/indices`,
    icon: <ProfileOutlined />,
    permissions: [permissions['cyber:siem:indices:read']],
  },
  {
    label: 'logManagement.logSearch.title',
    key: `${path}/log-search`,
    icon: <FileSearchOutlined />,
    permissions: [permissions['cyber:siem:search:read']],
  },
  {
    label: 'siem.subModule.report',
    key: `${path}/report`,
    icon: <FileDoneOutlined />,
    permissions: [permissions['cyber:siem:report:read']],
  },
  {
    key: 'setting',
    type: 'group',
    label: 'logManagement.setting.groupTitle',
    children: [
      {
        label: 'logManagement.setting.general',
        key: `${path}/setting`,
        icon: <SettingOutlined />,
        permissions: [
          permissions['cyber:core:setting:read'],
        ],
      },
      {
        label: 'logManagement.notificationSetting.title',
        key: `${path}/notification-setting`,
        icon: <BellOutlined />,
        permissions: [
          permissions[
            'cyber:siem:notification-setting:read'
          ],
        ],
      },
    ],
  },
  {
    key: 'docs',
    type: 'group',
    label: 'logManagement.document.docs',
    children: [
      {
        label: 'logManagement.document.documentation',
        key: `${path}/documentation`,
        icon: <FileTextOutlined />,
      },
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
      productName: 'cyber',
      moduleName,
    });

    authStore.setState({
      permissions: {
        ...authStore.getState().permissions,
        ...data,
      },
    });

    return data[key];
  }

  return (
    [
      ...permissionStore?.[key],
      ...permissionStore?.core,
    ] ?? []
  );
};

export const siemNavigation = async () => {
  const permissions = await getPermissions(
    'siem',
    'siem,core'
  );

  return onFilterNavigation(siemItem, permissions);
};
