import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const complianceIcon = {
  ObjectUUID: primaryKey(uuid),
  fileID: String,
  fileName: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};
