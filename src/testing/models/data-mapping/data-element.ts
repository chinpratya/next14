import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils';

export const dataMappingDataElement = {
  dataElementID: primaryKey(uid),
  name: String,
  dataClassificationID: String,
  dataClassification: String,
  organization: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingDataElementMeta = {
  ObjectUUID: primaryKey(String),
  name: String,
};
