import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementTransaction = {
  purposeID: primaryKey(uuid),
  consentReceiptsID: String,
  dataSubject: String,
  email: String,
  status: String,
  collectionPoint: String,
  activityGroup: String,
  purposeGroup: String,
  duration: {
    day: String,
    month: String,
    year: String,
  },
  expiryDate: String,

  receiptID: String,
  transactionsID: String,
  source: String,
  subjectIdentifierID: String,
  interactionType: String,
  cratedDt: String,
  version: Number,
  chanel: String,
  activityName: String,
  consentType: String,
  optIn: Boolean,
};

export const consentManagementTransactionPurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  description: String,
  displayType: String,
  displayTypeID: String,
  preferences: Array,
  value: Array,
};
