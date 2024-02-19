import { primaryKey } from '@mswjs/data';
import { v4 as uid } from 'uuid';

export const organizationUserOrgLevel = {
  levelId: primaryKey(uid),
  underId: String,
  label_th: String,
  label_en: String,
  type: String,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
};
