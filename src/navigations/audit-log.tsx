import { AuditOutlined } from '@ant-design/icons';

import {
  APP_PATH,
  CYBERFENCE_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${APP_PATH}${CYBERFENCE_PATH}`;

export const auditLogNavigation: NavigationType[] = [
  {
    key: `${path}/audit-log`,
    label: 'ประวัติการใช้งานระบบ',
    icon: <AuditOutlined />,
  },
];
