import {
  DashboardOutlined,
  DotChartOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  MailOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import {
  AiOutlineFileDone,
  AiOutlineTags,
} from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_DATA_BREACH_MANAGEMENT_PATH,
  DATAFENCE_PATH,
} from '@/config/modules';
import { tokens } from '@/lang';
import { NavigationType } from '@/types';
import { authStore } from '@/stores/auth';
import { onFilterNavigation } from '.';
import { listPermission } from '@/features/shared';
import { permissions } from '@/permissions';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DATA_BREACH_MANAGEMENT_PATH}`;

export const dataBreachItem: NavigationType[] = [
  {
    label: tokens.dataBreach.dashboard.title,
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
    permissions: [
      permissions['pdpakit:databreach:dashboard:read'],
    ],
  },
  {
    label: tokens.dataBreach.responsePlan.title,
    key: `${path}/response-plan`,
    icon: <DotChartOutlined />,
    permissions: [
      permissions['pdpakit:databreach:responseplan:read'],
    ],
  },
  {
    label: tokens.dataBreach.riskMatrix.title,
    key: `${path}/risk-matrix`,
    icon: <FundProjectionScreenOutlined />,
    permissions: [
      permissions['pdpakit:databreach:riskmatrix:read'],
    ],
  },
  {
    label: tokens.dataBreach.incidentTemplate.title,
    key: `${path}/incident-template`,
    icon: <MailOutlined />,
    permissions: [
      permissions[
        'pdpakit:databreach:incidenttemplate:read'
      ],
    ],
  },
  {
    label: tokens.dataBreach.webform.title,
    key: `${path}/webform`,
    icon: <FileTextOutlined />,
    permissions: [
      permissions['pdpakit:databreach:webform:read'],
    ],
  },
  {
    label: tokens.dataBreach.request.title,
    key: `${path}/request`,
    icon: <MessageOutlined />,
    permissions: [
      permissions['pdpakit:databreach:request:read'],
    ],
  },
  {
    label: tokens.dataBreach.task.title,
    key: `${path}/task`,
    icon: <AiOutlineFileDone />,
    permissions: [
      permissions['pdpakit:databreach:task:read'],
    ],
  },
  {
    label: tokens.dataBreach.tags.title,
    key: `${path}/tags`,
    icon: <AiOutlineTags />,
    permissions: [
      permissions['pdpakit:databreach:tag:read'],
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

export const dataBreachNavigation = async () => {
  const permissions = await getPermissions(
    'databreach',
    'databreach'
  );

  return onFilterNavigation(dataBreachItem, permissions);
};
