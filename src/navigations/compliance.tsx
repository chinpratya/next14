import {
  SendOutlined,
  SettingOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  FolderOpenOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_COMPLIANCE_MANAGEMENT_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_COMPLIANCE_MANAGEMENT_PATH}`;

export const complianceItem: NavigationType[] = [
  {
    key: `${path}/dashboard`,
    label: 'compliance.dashboard.title',
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:compliance:dashboard:read'],
    ],
  },
  {
    key: `${path}/assessment-submission`,
    label: 'compliance.assessmentSubmission.title',
    icon: <SendOutlined />,
    permissions: [
      permissions['pdpakit:compliance:submission:read'],
    ],
  },
  {
    key: `${path}/setup`,
    label: 'compliance.setup.title',
    icon: <SettingOutlined />,
    children: [
      {
        key: `${path}/organization`,
        label: 'compliance.organization.title',
        icon: <ApartmentOutlined />,
        permissions: [
          permissions[
            'pdpakit:compliance:organization:read'
          ],
        ],
      },
      {
        key: `${path}/department`,
        label: 'compliance.department.title',
        icon: <ClusterOutlined />,
        permissions: [
          permissions['pdpakit:compliance:branch:read'],
        ],
      },
      {
        key: `${path}/assessment-inventory`,
        label: 'compliance.assessmentInventory.title',
        icon: <FolderOpenOutlined />,
        permissions: [
          permissions['pdpakit:compliance:template:read'],
        ],
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

export const complianceNavigation = async () => {
  const permissions = await getPermissions(
    'compliance',
    'compliance'
  );

  return onFilterNavigation(complianceItem, permissions);
};
