import {
  FileDoneOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

import { PORTAL_PATH } from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${PORTAL_PATH}/assessment-automation`;

export const assessmentAutomationPortalNavigation = (
  role: string
): NavigationType[] => [
  {
    key: `${path}/${role}/assessment`,
    label: 'compliancePortal.assessment.title',
    icon: <FileTextOutlined />,
  },
  {
    key: `${path}/${role}/results`,
    label: 'compliancePortal.result.title',
    icon: <FileDoneOutlined />,
  },
];
