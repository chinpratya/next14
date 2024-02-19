import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationUserOrgInfo = {
  departmentId: primaryKey(uid),
  department_type: String,
  department_name: String,
  department_abbreviation: String,
  department_head: String,
  under_department: String,
  address: String,
  province: String,
  district: String,
  sub_district: String,
  zip_code: String,
  email: String,
  phone_number: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
};
