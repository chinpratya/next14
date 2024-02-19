import {
  DashboardOutlined,
  FileOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_CUSTOM_REPORT_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_CUSTOM_REPORT_PATH}`;

export const customReportNavigation: NavigationType[] = [
  {
    label: 'customReport.dashboard.title',
    key: `${path}/dashboard`,
    icon: <DashboardOutlined />,
  },
  // {
  //   label: 'customReport.report.title',
  //   key: `${path}/report`,
  //   icon: <FileOutlined />,
  // },
];
