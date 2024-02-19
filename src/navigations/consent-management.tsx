import {
  DashboardOutlined,
  FileTextOutlined,
  FundViewOutlined,
  ProfileOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { AiOutlineTags } from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_CONSENT_MANAGEMENT_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';
import {
  ReceiptOutlined,
  TransactionIcon,
} from '@utilComponents/icon';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_CONSENT_MANAGEMENT_PATH}`;

export const consentManagementItem: NavigationType[] = [
  {
    label: 'consentManagement.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:consent:dashboard:read'],
    ],
  },
  {
    label: 'consentManagement.purpose.title',
    key: `${path}/purpose`,
    icon: <FileTextOutlined />,
    permissions: [
      permissions['pdpakit:consent:purpose:read'],
    ],
  },
  {
    label: 'consentManagement.activity.title',
    key: `${path}/activity`,
    icon: <FundViewOutlined />,
    permissions: [
      permissions['pdpakit:consent:activity:read'],
    ],
  },
  {
    label: 'consentManagement.collectionPoint.title',
    key: `${path}/collection-point`,
    icon: <ProfileOutlined />,
    permissions: [
      permissions['pdpakit:consent:collectionpoint:read'],
    ],
  },
  {
    label: 'consentManagement.preferenceCenters.title',
    key: `${path}/preference-centers`,
    icon: <SnippetsOutlined />,
    permissions: [
      permissions[
        'pdpakit:consent:preferencecenters:read'
      ],
    ],
  },

  {
    label: 'consentManagement.receipts.title',
    key: `${path}/receipts`,
    icon: <ReceiptOutlined />,
    permissions: [
      permissions['pdpakit:consent:receipts:read'],
    ],
  },
  {
    label: 'consentManagement.transaction.title',
    key: `${path}/transaction`,
    icon: <TransactionIcon />,
    permissions: [
      permissions['pdpakit:consent:transaction:read'],
    ],
  },
  {
    label: 'consentManagement.tags.title',
    key: `${path}/tags`,
    icon: <AiOutlineTags />,
    permissions: [
      permissions['pdpakit:consent:tag:read'],
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

export const consentManagementNavigation = async () => {
  const permissions = await getPermissions(
    'consent',
    'consent'
  );

  return onFilterNavigation(
    consentManagementItem,
    permissions
  );
};
