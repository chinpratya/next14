import { consentManagementActivityHandlers } from './activity';
import { consentManagementCollectionPointHandlers } from './collection-point';
import { consentManagementDashboardHandlers } from './dashboard';
import { consentManagementPreferenceCentersHandlers } from './preference-centers';
import { consentManagementPurposeHandlers } from './purpose';
import { consentManagementReceiptHandlers } from './receipt';
import { consentManagementTransactionHandlers } from './transaction';

export const consentManagementHandlers = [
  ...consentManagementPurposeHandlers,
  ...consentManagementCollectionPointHandlers,
  ...consentManagementActivityHandlers,
  ...consentManagementReceiptHandlers,
  ...consentManagementPreferenceCentersHandlers,
  ...consentManagementCollectionPointHandlers,
  ...consentManagementTransactionHandlers,
  ...consentManagementDashboardHandlers,
];
