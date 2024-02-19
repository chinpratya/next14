import { NavigationType } from '@/types';
import utils from '@/utils';

import { adminNavigation } from './admin';
import { assessmentAutomationNavigation } from './assessment-automation';
import { assessmentAutomationPortalNavigation } from './assessment-automation-portal';
import { auditLogNavigation } from './audit-log';
import { complianceNavigation } from './compliance';
import { consentManagementNavigation } from './consent-management';
import { cookieManagementNavigation } from './cookie-management';
import { customReportNavigation } from './custom-report';
import { dataBreachNavigation } from './data-breach';
import { dataMappingNavigation } from './data-mapping';
import { dsarAutomationNavigation } from './dsar-automation';
import { incidentManagementNavigation } from './incident-management';
import { logManagementNavigation } from './log-management';
import { policyManagementNavigation } from './policy-management';
import { riskAssessmentNavigation } from './risk-assessment';
import { siemNavigation } from './siem';
import { threatIntelligenceNavigation } from './threat-intelligence';
import { vulnerabilityManagementNavigation } from './vulnerability-management';

export const getNavigation = (
  asPath: string,
  query: Record<string, unknown>
) => {
  if (utils.getNavigationRoot(asPath) === 'admin') {
    return adminNavigation;
  }

  if (
    utils.getNavigationApp(asPath) ===
    'assessment-automation'
  ) {
    return assessmentAutomationPortalNavigation(
      asPath.split('/')[3]
    );
  }

  switch (utils.getNavigationModule(asPath)) {
    case 'assessment-automation':
      return assessmentAutomationNavigation;
    case 'compliance':
      return complianceNavigation();
    case 'consent-management':
      return consentManagementNavigation();
    case 'custom-report':
      return customReportNavigation;
    case 'cookie-management':
      return cookieManagementNavigation(query);
    case 'data-breach':
      return dataBreachNavigation();
    case 'risk-assessment':
      return riskAssessmentNavigation();
    case 'data-mapping':
      return dataMappingNavigation();
    case 'policy-management':
      return policyManagementNavigation();
    case 'dsar-automation':
      return dsarAutomationNavigation();
    case 'siem':
      return siemNavigation();
    case 'log-management':
      return logManagementNavigation();
    case 'audit-log':
      return auditLogNavigation;
    case 'threat-intelligence':
      return threatIntelligenceNavigation;
    case 'incident':
      return incidentManagementNavigation;
    case 'vulnerability-management':
      return vulnerabilityManagementNavigation;
    default:
      return [];
  }
};

export const onFilterNavigation = (
  currentNavigation: NavigationType[],
  permissions: string[]
) => {
  return currentNavigation.filter((item) => {
    if (item.permissions) {
      return permissions.some((permission) =>
        item.permissions?.includes(permission)
      );
    }

    if (item.children) {
      item.children = item.children.filter(
        (childrenItem) => {
          if (childrenItem.permissions) {
            return permissions.some((permission) =>
              childrenItem.permissions?.includes(
                permission
              )
            );
          }
          return true;
        }
      );
    }

    if (item.children?.length === 0) return false;

    return true;
  });
};
