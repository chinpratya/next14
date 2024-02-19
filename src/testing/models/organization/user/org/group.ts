import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationUserOrgGroup = {
  groupId: primaryKey(uid),
  name: String,
  name_en: String,
  description: String,
  total_user: Number,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
};

export const organizationUserOrgGroupMember = {
  userId: primaryKey(uid),
  first_name: String,
  last_name: String,
  first_name_en: String,
  last_name_en: String,
  email: String,
  phone_number: String,
  employee_classification: String,
  status: String,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
  organization_labels: Array,
};

export const organizationUserOrgGroupRole = {
  roleId: primaryKey(uid),
  name: String,
  name_en: String,
  status: String,
  description: String,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
};
