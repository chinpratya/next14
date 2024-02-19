import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementPurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  description: String,
  organizationID: String,
  groupID: String,
  status: String,
  isDataUsagePeriod: Boolean,
  dataUsagePeriod: {
    day: Number,
    month: Number,
    year: Number,
    description: String,
  },
  isConsent: Boolean,
  consentDetail: String,
  isEffect: Boolean,
  effectDescription: String,
  displayType: String,
  preferences: Array,
};
