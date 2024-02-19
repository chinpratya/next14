import {
  consentManagementActivityPurpose,
  consentManagementActivityPreview,
} from './activity';
import {
  consentManagementCollectionPoint,
  consentManagementCollectionPointElement,
  consentManagementCollectionPointPrivacyNotice,
  consentManagementCollectionPointHistory,
} from './collection-point';
import { consentManagementDashboardAccept } from './dashboard';
import { consentManagementPreferenceCenters } from './preference-centers';
import { consentManagementPurpose } from './purpose';
import { consentManagementReceipt } from './receipt';
import {
  consentManagementTransaction,
  consentManagementTransactionPurpose,
} from './transaction';

export const consentManagementModels = {
  consentManagementPurpose,
  consentManagementActivityPurpose,
  consentManagementActivityPreview,
  consentManagementReceipt,
  consentManagementCollectionPoint,
  consentManagementPreferenceCenters,
  consentManagementCollectionPointElement,
  consentManagementCollectionPointPrivacyNotice,
  consentManagementCollectionPointHistory,
  consentManagementTransaction,
  consentManagementTransactionPurpose,
  consentManagementDashboardAccept,
};
