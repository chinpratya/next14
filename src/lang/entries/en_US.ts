import antdEnUS from 'antd/lib/locale/en_US';

import adminEnUS from '../locales/admin/en_US.json';
import breadcrumbsEnUS from '../locales/breadcrumbs/en_US.json';
import { commonEnUS } from '../locales/common/en_US';
import complianceEnUS from '../locales/compliance/en_US.json';
import compliancePortalEnUS from '../locales/compliance-portal/en_US.json';
import { componentsEnUS } from '../locales/components/en_US';
import consentManagementEnUS from '../locales/consent-management/en_US.json';
import { cookieManagementEnUS } from '../locales/cookie-management/en_US';
import customReportEnUS from '../locales/custom-report/en_US.json';
import { dataBreachEnUS } from '../locales/data-breach/en_US';
import dataMappingEnUS from '../locales/data-mapping/en_US.json';
import dsarAutomationEnUS from '../locales/dsar-automation/en_US.json';
import generalEnUS from '../locales/general/es_US.json';
import incidentManagementEnUS from '../locales/incident-management/en_US.json';
import logManagementEnUS from '../locales/log-managenent/en_US.json';
import notificationEnUs from '../locales/notification/en_US.json';
import organizationEnUS from '../locales/organization/en_US.json';
import policyManagementEnUS from '../locales/policy-management/en_US.json';
import profileEnUs from '../locales/profile/en_US.json';
import { riskAssessmentEnUS } from '../locales/risk-assessment/en_US';
import siemEnUS from '../locales/siem/en_US.json';

const EnLang = {
  antd: antdEnUS,
  locale: 'en-US',
  messages: {
    ...adminEnUS,
    ...breadcrumbsEnUS,
    ...commonEnUS,
    ...componentsEnUS,
    ...consentManagementEnUS,
    ...cookieManagementEnUS,
    ...customReportEnUS,
    ...dataBreachEnUS,
    ...dataMappingEnUS,
    ...dsarAutomationEnUS,
    ...generalEnUS,
    ...notificationEnUs,
    ...organizationEnUS,
    ...policyManagementEnUS,
    ...profileEnUs,
    ...siemEnUS,
    ...logManagementEnUS,
    ...incidentManagementEnUS,
    ...complianceEnUS,
    ...compliancePortalEnUS,
    ...riskAssessmentEnUS,
  },
};
export default EnLang;
