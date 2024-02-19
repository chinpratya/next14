import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementCollectionPoint = {
  CollectionPointID: primaryKey(uuid),
  name: String,
  identifier: String,
  status: String,
  version: Number,
  createdBy: String,
  createdDt: String,
  updatedBy: String,
  updatedDt: String,
  description: String,
  activityID: String,
  activity: String,
  organizationID: String,
  organization: String,
  delegateID: String,
  delegate: String,
  form: String,
  isUsing: Boolean,
};

export const consentManagementCollectionPointElement = {
  id: primaryKey(uuid),
  dataSubjectIdentifier: String,
  purposes: Array,
  dataElements: Array,
};

export const consentManagementCollectionPointPrivacyNotice =
  {
    id: primaryKey(uuid),
    isSentLink: Boolean,
    doubleOptIn: Boolean,
    isprivacyNotice: Boolean,
    policyTypeID: String,
    policyType: String,
    privacyName: String,
    relatePrivacyNoticeID: String,
    relatePrivacyNotice: String,
    displayID: String,
    display: String,
    linkPrivacy: String,
    privacyVersion: String,
    UrlPolicy: String,
  };

export const consentManagementCollectionPointHistory = {
  objectUUID: primaryKey(uuid),
  version: String,
  createdBy: String,
  createdDt: String,
  updatedBy: String,
  updatedDt: String,
};
