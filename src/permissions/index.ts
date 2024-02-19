import { compliancePermissions } from './compliance';
import { consentManagementPermissions } from './consent-management';
import { cookieManagementPermissions } from './cookie-management';
import { datamappingPermissions } from './data-mapping';
import { dsarPermissions } from './dsar-automation';
import { logManagementPermissions } from './log-management';
import { organizationPermissions } from './organization';
import { policyManagementPermissions } from './policy-management';
import { customdashboardPermissions } from './customdashboard';
import { siemPermissions } from './siem';
import { riskAssessmentPermissions } from './risk-assessment';
import { databreachPermissions } from './data-breach';

export const permissions = {
  ...logManagementPermissions,
  ...siemPermissions,
  ...datamappingPermissions,
  ...consentManagementPermissions,
  ...cookieManagementPermissions,
  ...policyManagementPermissions,
  ...dsarPermissions,
  ...compliancePermissions,
  ...organizationPermissions,
  ...customdashboardPermissions,
  ...riskAssessmentPermissions,
  ...databreachPermissions,
};

export const products = {
  cyber: 'cyber',
  pdpakit: 'pdpakit',
};
