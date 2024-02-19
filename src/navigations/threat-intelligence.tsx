import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  MonitorOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { BiWorld } from 'react-icons/bi';

import {
  APP_PATH,
  CYBERFENCE_PATH,
  CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH}`;

export const threatIntelligenceNavigation: NavigationType[] =
  [
    {
      label: 'Dashboard',
      key: `${path}/dashboard`,
      icon: <DashboardOutlined />,
    },
    // {
    //   label: 'Analysis',
    //   key: `${path}/analysis`,
    //   icon: <MonitorOutlined />,
    // },
    {
      label: 'Analysis',
      key: `${path}/feed`,
      icon: <MonitorOutlined />,
    },
    {
      label: 'Threat Monitoring',
      key: `${path}/threat-monitoring`,
      icon: <FundProjectionScreenOutlined />,
    },
    {
      label: 'News',
      key: `${path}/news`,
      icon: <ReadOutlined />,
    },
    {
      label: 'Dark Web Monitoring',
      key: `${path}/dark-web-monitoring`,
      icon: <BiWorld />,
    },
  ];
