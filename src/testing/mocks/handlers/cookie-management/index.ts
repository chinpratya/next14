import { cookieManagementCategoryHandlers } from './category';
import { cookieManagementDashboardHandlers } from './dashboard';
import { cookieManagementDomainHandlers } from './domain';
import { cookieManagementScanHandlers } from './scan';

export const cookieManagementHandlers = [
  ...cookieManagementCategoryHandlers,
  ...cookieManagementDashboardHandlers,
  ...cookieManagementDomainHandlers,
  ...cookieManagementScanHandlers,
];
