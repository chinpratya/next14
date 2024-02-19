import {
  FundProjectionScreenOutlined,
  SettingOutlined,
  // DashboardOutlined,
  NotificationOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { AiOutlineTags } from 'react-icons/ai';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_RISK_ASSESSMENT_AUTOMATION_MANAGEMENT_PATH,
} from '@/config/modules';
import { listPermission } from '@/features/shared';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { authStore } from '@/stores/auth';
import { NavigationType } from '@/types';

import { onFilterNavigation } from '.';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_RISK_ASSESSMENT_AUTOMATION_MANAGEMENT_PATH}`;

export const riskAssessmentItem: NavigationType[] = [
  // {
  //   key: `${path}/assessment-dashboard`,
  //   label: 'แดชบอร์ด',
  //   icon: <DashboardOutlined />,
  // },
  {
    key: `${path}/template-risk`,
    label: tokens.riskAssessment.riskTemplate.title,
    icon: <FundProjectionScreenOutlined />,
    permissions: [
      permissions['pdpakit:assessment:templaterisk:read'],
    ],
  },
  {
    key: `${path}/setup`,
    label: tokens.riskAssessment.privacyManagement.title,
    icon: <SettingOutlined />,
    children: [
      {
        key: `${path}/activity`,
        label: tokens.riskAssessment.activity.title,
        icon: <NotificationOutlined />,
        permissions: [
          permissions['pdpakit:assessment:activity:read'],
        ],
      },
    ],
  },
  {
    key: `${path}/measure`,
    label: tokens.riskAssessment.riskMeasures.title,
    icon: <FileDoneOutlined />,
    permissions: [
      permissions[
        'pdpakit:assessment:assessmentrisk:read'
      ],
    ],
  },
  {
    key: `${path}/tags`,
    label: tokens.riskAssessment.tags.title,
    icon: <AiOutlineTags />,
    permissions: [
      permissions['pdpakit:assessment:tag:read'],
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

export const riskAssessmentNavigation = async () => {
  const permissions = await getPermissions(
    'assessment',
    'assessment'
  );

  return onFilterNavigation(
    riskAssessmentItem,
    permissions
  );
};
