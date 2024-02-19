import { ReactNode } from 'react';

import {
  CybersecurityIcon,
  PrivacyManagementIcon,
  PhysicalSecurityIcon,
  CentralManagementIcon,
} from '@utilComponents/icon';

export const APP_ICONS: Record<string, ReactNode> = {
  datafence: <PrivacyManagementIcon />,
  cyberfence: <CybersecurityIcon />,
  physicalManagement: <PhysicalSecurityIcon />,
  centralManagement: <CentralManagementIcon />,
};
