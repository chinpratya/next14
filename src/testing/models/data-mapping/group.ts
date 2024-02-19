import { primaryKey } from '@mswjs/data';

export const dataMappingGroup = {
  groupID: primaryKey(String),
  name: String,
  menuID: String,
  menuName: String,
  organizationID: String,
  organizationName: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingGroupMeta = {
  ObjectUUID: primaryKey(String),
  name: String,
};
