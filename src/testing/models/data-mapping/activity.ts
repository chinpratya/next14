import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const dataMappingActivity = {
  ObjectUUID: primaryKey(uuid),
  name: String,
  activityType: String,
  group: String,
  groupID: String,
  status: String,
  owner: String,
  ownerID: String,
  organization: String,
  organizationID: String,
  created_dt: String,
  updated_dt: String,
  created_by: String,
  updated_by: String,
  isDisclosure: Boolean,
  dataSubject: String,
  dataSubjectID: String,
};

export const dataMappingActivityCollect = {
  ObjectUUID: primaryKey(uuid),
  dataStoreTypeID: Array,
  dataStoreType: Array,
  isDataUsagePeriod: Boolean,
  dataUsagePeriod: {
    day: String,
    month: String,
    year: String,
    description: String,
  },
  dataRetentionMethod: String,
  rightsAndMethodAccessPersonalInformation: String,
  methodRemoveWhenExpire: String,
  created_at: String,
  updated_at: String,
  created_by: String,
  updated_by: String,
};

export const dataMappingActivityActor = {
  id: primaryKey(uuid),
  activityId: String,
  actorType: String,
  ObjectUUID: String,
  name: String,
  email: String,
  phoneNumber: String,
  type: String,
  organization: String,
  organizationType: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingActivityLawfulBasis = {
  ObjectUUID: primaryKey(uuid),
  basis: Array,
  rightsOfDataSubjects: Array,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingActivityBasis = {
  activityID: String,
  basisID: primaryKey(uuid),
  description: String,
  fileID: String,
  fileUrl: String,
};

export const dataMappingActivityBasisPurpose = {
  ObjectUUID: primaryKey(uuid),
  purposeID: String,
  name: String,
  group: String,
  dataUsagePeriod: {
    day: String,
    month: String,
    year: String,
    description: String,
  },
  basisID: String,
  description: String,
  fileID: String,
  fileUrl: String,
};

export const dataMappingActivityBasisPurposeDataCategory =
  {
    ObjectUUID: primaryKey(uuid),
    basisID: String,
    dataCategoryID: String,
    purposeID: String,
    name: String,
    dataElements: Array,
  };

export const dataMappingActivityCollectPurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  legalBasis: String,
  group: String,
  organization: String,
  isDataUsagePeriod: Boolean,
  dataUsagePeriod: {
    day: String,
    month: String,
    year: String,
    description: String,
  },
  basisID: String,
  description: String,
  fileID: String,
  fileUrl: String,
};

export const dataMappingActivityCollectChannel = {
  assetID: primaryKey(uuid),
  name: String,
  group: String,
  owner: String,
  country: String,
  organization: String,
  sourceID: String,
  source: String,
};

export const dataMappingActivityCollectDataRetention = {
  assetID: primaryKey(uuid),
  name: String,
  group: String,
  owner: String,
  country: String,
  organization: String,
  sourceID: String,
  source: String,
};

export const dataMappingActivityDataCategory = {
  id: primaryKey(uuid),
  categoryID: String,
  activityID: String,
  name: String,
  categoryClassifications: Array,
  organizationID: String,
  organization: String,
  groupID: String,
  groupName: String,
  dataSubjects: Array,
  status: String,
  source: Array,
  sourceID: Array,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingActivityPreview = {
  id: primaryKey(uuid),
  activityID: String,
  name: String,
  dataController: {
    actorID: String,
    name: String,
    address: String,
    personalType: String,
    actorType: String,
    country: String,
    email: String,
    phone: String,
  },
  dataProtectionOfficer: {
    actorID: String,
    name: String,
    address: String,
    personalType: String,
    actorType: String,
    country: String,
    email: String,
    phone: String,
  },
  dataCategories: Array,
  purposes: Array,
  isTranfer: Boolean,
  tranferData: Array,
  privacyPolicy: {
    storage: Array,
    storageType: Array,
    dataRetentionMethod: Array,
    rightsAccessPersonalData: Array,
    removeOrDelete: Array,
    securityMeasuresUnderSection37: Array,
    rightsOfPersonalData: Array,
  },
};

export const dataMappingActivityDisclosureActor = {
  id: primaryKey(uuid),
  activityId: String,
  actorID: String,
  name: String,
  personalType: String,
  actorType: String,
  country: String,
  organization: String,
  organizationType: String,
  purposeID: String,
  purpose: String,
};

export const dataMappingActivityUseAndPublishPurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  legalBasis: String,
  group: String,
  lifeCycle: String,
  organization: String,
};

export const dataMappingActivityUsage = {
  ID: primaryKey(uuid),
  isUsageData: Boolean,
};

export const dataMappingActivityUsagePurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  legalBasis: Array,
  group: String,
  organization: String,
};

export const dataMappingActivityUsagePeople = {
  peopleID: primaryKey(uuid),
  name: String,
  description: String,
  organization: String,
};
