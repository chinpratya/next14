import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationUserOrgUserUserInfo = {
  infoId: primaryKey(uid),
  prefix: String,
  first_name: String,
  last_name: String,
  id_card_number: String,
  email_and_username: String,
  phone_number: String,
  sex: String,
  date_of_birth: String,
  age: String,
};

export const organizationUserOrgUserWorkInfo = {
  workId: primaryKey(uid),
  organization: String,
  organization_abbreviation: String,
  department: String,
  head_of_department: String,
  position: String,
  employee_type: String,
  employee_no: String,
  start_date: String,
  end_date: String,
};

export const organizationUserOrgUserAddress = {
  addressId: primaryKey(uid),
  address: String,
  province: String,
  district: String,
  sub_district: String,
  zip_code: String,
};

export const organizationUserOrgUsers = {
  userId: primaryKey(uid),
  first_name: String,
  last_name: String,
  first_name_en: String,
  last_name_en: String,
  email: String,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
  phone_number: String,
  status: String,
  employee_classification: String,
  organization_labels: Array,
  // user_info: oneOf('organizationUserOrgUserUserInfo'),
  // work_info: oneOf('organizationUserOrgUserWorkInfo'),
  // address: oneOf('organizationUserOrgUserAddress'),
};

export const organizationUserOrgUserDepartMent = {
  departmentId: primaryKey(uid),
  department_name: String,
  department_name_en: String,
  department_type: String,
  department_abbreviation: String,
  department_head: String,
  under_department: String,
  level_label: String,
  level: String,
};

export const organizationUserOrgUserRole = {
  composite: Boolean,
  description: String,
  roleId: primaryKey(uid),
  name: String,
};
export const organizationUserOrgUserGroup = {
  groupId: primaryKey(uid),
  name: String,
  name_en: String,
  status: String,
  created_dt: String,
  updated_dt: String,
  created_by: String,
  updated_by: String,
  description: String,
};

export const organizationUserOrgUserGroupMember = {
  userId: primaryKey(uid),
  created_at: String,
  profile_pic: String,
  first_name: String,
  last_name: String,
  prefix: String,
  email: String,
  phone_number: String,
  department: String,
  position: String,
  updated_at: String,
};

export const organizationUserOrgUserGroupRole = {
  name: String,
  roleId: primaryKey(uid),
  description: String,
};
