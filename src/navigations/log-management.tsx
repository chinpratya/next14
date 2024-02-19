import {
  DashboardOutlined,
  BellOutlined,
  ProfileOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  CYBERFENCE_PATH,
  CYBERFENCE_LOG_MANAGEMENT_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_LOG_MANAGEMENT_PATH}`;

const logManagementItem: NavigationType[] = [
  {
    label: 'logManagement.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [permissions['cyber:lm:dashboard:read']],
  },
  {
    label: 'logManagement.indices.title',
    key: `${path}/indices`,
    icon: <ProfileOutlined />,
    permissions: [permissions['cyber:lm:indices:read']],
  },
  {
    label: 'logManagement.logSearch.title',
    key: `${path}/log-search`,
    icon: <FileSearchOutlined />,
    permissions: [permissions['cyber:lm:search:read']],
  },
  {
    label: 'logManagement.logFile.title',
    key: `${path}/log-file`,
    icon: <FolderOpenOutlined />,
    children: [
      {
        label: 'logManagement.explorer.title',
        key: `${path}/explorer`,
        permissions: [
          permissions['cyber:lm:explorer:read'],
        ],
      },
      {
        label: 'logManagement.archive.title',
        key: `${path}/archive`,
        permissions: [
          permissions['cyber:lm:archive:read'],
        ],
      },
    ],
  },
  {
    label: 'logManagement.report.title',
    key: `${path}/report`,
    icon: <FileDoneOutlined />,
    permissions: [permissions['cyber:lm:report:read']],
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
            'cyber:lm:notification-setting:read'
          ],
        ],
      },
      {
        label: 'logManagement.whitelist.title',
        key: `${path}/whitelist`,
        icon: <SafetyCertificateOutlined />,
        permissions: [
          permissions['cyber:lm:whitelist:read'],
        ],
      },
      {
        label: 'logManagement.backupData.title',
        key: `${path}/backup-data`,
        icon: <DatabaseOutlined />,
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

export const logManagementNavigation = async () => {
  const permissions = await getPermissions(
    'log',
    'lm,core'
  );

  return onFilterNavigation(
    logManagementItem,
    permissions
  );
};
