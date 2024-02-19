import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const complianceAssessmentModel = {
  ObjectUUID: primaryKey(uid),
  name: String,
  group: Array,
  version: Number,
  status: String,
  description: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};
