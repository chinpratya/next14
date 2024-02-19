import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationUserOrgRole = {
  roleId: primaryKey(uid),
  name: String,
  name_en: String,
  status: String,
  description: String,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
  permissionsId: Array,
};
