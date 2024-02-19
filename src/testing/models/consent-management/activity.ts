import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementActivityPurpose = {
  purposeID: primaryKey(uuid),
  name: String,
  group: String,
  version: Number,
  createdBy: String,
  createdDt: String,
  updatedBy: String,
  updatedDt: String,
};

export const consentManagementActivityPreview = {
  ObjectUUID: primaryKey(uuid),
  purposeID: String,
  description: String,
  displayType: String,
  displayTypeID: String,
  Preference: Array,
};
