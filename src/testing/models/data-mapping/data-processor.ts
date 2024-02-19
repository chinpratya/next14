import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const dataMappingDataProcessor = {
  dataProcessorID: primaryKey(uuid),
  positionID: String,
  position: String,
  organizationTypeID: String,
  organizationID: String,
  organizationName: String,
  organizationType: String,
  personalTypeID: String,
  personalType: String,
  userID: String,
  name: String,
  email: String,
  tel: String,
  address: String,
  url: String,
  note: String,
  countryID: String,
  country: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
