import {
  SettingOutlined,
  PieChartOutlined,
  AlertOutlined,
  ExceptionOutlined,
  TagOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  CENTRAL_MANAGEMENT_PATH,
  CENTRAL_MANAGEMENT_INCIDENT_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${APP_PATH}${CENTRAL_MANAGEMENT_PATH}${CENTRAL_MANAGEMENT_INCIDENT_PATH}`;

export const incidentManagementNavigation: NavigationType[] =
  [
    {
      label: 'incidentManagement.dashboard.title',
      key: `${path}/dashboard`,
      icon: <PieChartOutlined />,
    },
    {
      label: 'incidentManagement.incident.title',
      key: `${path}/incident`,
      icon: <AlertOutlined />,
    },
    {
      label: 'incidentManagement.task.title',
      key: `${path}/task`,
      icon: <ExceptionOutlined />,
    },
    {
      label: 'incidentManagement.setting.title',
      key: `${path}/setting`,
      icon: <SettingOutlined />,
      children: [
        {
          label: 'incidentManagement.workflow.title',
          key: `${path}/workflow`,
        },
        {
          label: 'incidentManagement.sla.title',
          key: `${path}/sla`,
        },
        {
          label: 'incidentManagement.tag.title',
          key: `${path}/tag`,
          icon: <TagOutlined />,
        },
        {
          label: 'incidentManagement.trigger.title',
          key: `${path}/trigger`,
        },
      ],
    },
  ];
