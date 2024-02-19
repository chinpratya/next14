import { complianceSeedDb } from './compliance';
import { consentManagementSeedDb } from './consent-management';
import { cookieManagementSeedDb } from './cookie-management';
import { coreSeedDb } from './core';
import { dataMappingSeedDb } from './data-mapping';
import { dsarAutomationSeedDb } from './dsar-automation';
import { optionSeedDb } from './option';
import { organizationSeedDb } from './organization';
import { policyManagementSeedDb } from './policy-management';

export const seedDb = () => {
  complianceSeedDb();
  consentManagementSeedDb();
  cookieManagementSeedDb();
  coreSeedDb();
  dataMappingSeedDb();
  dsarAutomationSeedDb();
  optionSeedDb();
  organizationSeedDb();
  policyManagementSeedDb();
};
