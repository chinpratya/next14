import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementPreferenceCenters = {
  preferenceID: primaryKey(uuid),
  name: String,
  description: String,
  activitys: Array,
  organizationID: String,
  organization: String,
  delegateID: String,
  delegate: String,
  status: String,
  version: Number,
  isCreateNewUser: Boolean,
  createdBy: String,
  createdDt: String,
  updatedBy: String,
  updatedDt: String,
  form: String,
};
