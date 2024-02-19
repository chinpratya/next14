import { primaryKey } from '@mswjs/data';

export const dataMappingDataCategories = {
  categoryID: primaryKey(String),
  name: String,
  groupID: String,
  groupName: String,
  categoryClassifications: Array,
  dataSubjects: Array,
  organizationID: String,
  organization: String,
  status: String,
  meta: {
    categoryID: String,
    dataSubjectID: String,
  },
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};

export const dataMappingDataElementOfCategories = {
  dataElementID: primaryKey(String),
  dataCategoryID: String,
  name: String,
  dataClassificationID: String,
  dataClassification: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
