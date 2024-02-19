import { primaryKey } from '@mswjs/data';

export const dataMappingAsset = {
  assetID: primaryKey(String),
  name: String,
  group: String,
  country: String,
  owner: String,
  organization: String,
  organizationID: String,
  organizationName: String,
  organizationType: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingAssetResponsible = {
  responsibleID: primaryKey(String),
  name: String,
  email: String,
  organizationID: String,
  organizationName: String,
  assetID: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
