import { addressModels } from './address';
import { complianceModels } from './assessment-automation';
import { consentManagementModels } from './consent-management';
import { cookieManagementModels } from './cookie-management';
import { coreModel } from './core';
import { dataMappingModels } from './data-mapping';
import { dsarAutomationModels } from './dsar-automation';
import { optionModels } from './option';
import { organizationModels } from './organization';
import { policyManagementModels } from './policy-management';

export const models = {
  ...addressModels,
  ...complianceModels,
  ...consentManagementModels,
  ...cookieManagementModels,
  ...coreModel,
  ...dataMappingModels,
  ...dsarAutomationModels,
  ...optionModels,
  ...organizationModels,
  ...policyManagementModels,
};
