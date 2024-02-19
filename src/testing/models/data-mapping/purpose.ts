import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils';

export const dataMappingPurpose = {
  purposeID: primaryKey(uid),
  name: String,
  group: String,
  groupID: String,
  legalBasis: Array,
  status: String,
  organization: String,
  organizationID: String,
  version: Number,
  isConsent: Boolean,
  consentDetail: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
  description: String,
  isDataUsagePeriod: Boolean,
  dataUsagePeriod: {
    day: Number,
    month: Number,
    year: Number,
    description: String,
  },
  isEffect: Boolean,
  effectDescription: String,
  displayType: String,
  preferences: Array,
};

export const dataMappingPurposeHistory = {
  historyID: primaryKey(uid),
  purposeID: String,
  name: String,
  group: String,
  groupID: String,
  legalBasis: Array,
  status: String,
  organization: String,
  organizationID: String,
  version: Number,
  isConsent: Boolean,
  consentDetail: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
