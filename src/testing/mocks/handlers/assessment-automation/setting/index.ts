import { complianceSettingMaturityModelHandlers } from './matutity-model';
import { complianceSettingOrganizationHandlers } from './organizations';

export const complianceSettingHandlers = [
  ...complianceSettingMaturityModelHandlers,
  ...complianceSettingOrganizationHandlers,
];
