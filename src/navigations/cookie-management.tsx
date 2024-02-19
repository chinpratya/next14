import {
  DashboardOutlined,
  ProfileOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_COOKIE_CONSENT_MANAGEMENT_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';
import {
  CookieIconOutlined,
  CookieConsentIconOutlined,
  WebsiteIconOutlined,
} from '@utilComponents/icon';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_COOKIE_CONSENT_MANAGEMENT_PATH}`;

export const cookieItem = (
  query: Record<string, unknown>
): NavigationType[] => {
  if (query.required === 'true') {
    return [
      {
        label: tokens.cookieManagement.websites.title,
        key: `${path}/websites`,
        icon: <WebsiteIconOutlined />,
        query,
      },
    ];
  }

  return [
    {
      label: tokens.cookieManagement.dashboard.title,
      key: `${path}/dashboard`,
      icon: <DashboardOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:dashboard:read'],
      ],
    },
    {
      label: tokens.cookieManagement.websites.title,
      key: `${path}/websites`,
      icon: <WebsiteIconOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:website:read'],
      ],
    },
    {
      label: tokens.cookieManagement.scanReport.title,
      key: `${path}/scan-report`,
      icon: <SecurityScanOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:reportscan:read'],
      ],
    },
    {
      label: tokens.cookieManagement.cookies.title,
      key: `${path}/cookies`,
      icon: <CookieIconOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:cookie:read'],
      ],
    },
    {
      label: tokens.cookieManagement.cookieBanner.title,
      key: `${path}/cookie-banner`,
      icon: <ProfileOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:banner:read'],
      ],
    },
    {
      label: tokens.cookieManagement.cookieConsent.title,
      key: `${path}/cookie-consent`,
      icon: <CookieConsentIconOutlined />,
      query,
      permissions: [
        permissions['pdpakit:cookie:consent:read'],
      ],
    },
  ];
};

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

export const cookieManagementNavigation = async (
  query: Record<string, unknown>
) => {
  const permissions = await getPermissions(
    'cookie',
    'cookie'
  );

  const cookieManagementItem = cookieItem(query);

  return onFilterNavigation(
    cookieManagementItem,
    permissions
  );
};
