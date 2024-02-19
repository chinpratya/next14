import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const optionType = {
  ObjectUUID: primaryKey(uid),
  name: String,
  description: String,
  type: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const optionModels = {
  optionType,
};
