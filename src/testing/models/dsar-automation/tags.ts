import { primaryKey } from '@mswjs/data';

export const dsarAutomationTags = {
  tagID: primaryKey(String),
  name: String,
  organization: String,
  organizationID: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};
