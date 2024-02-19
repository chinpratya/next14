import { primaryKey } from '@mswjs/data';
import { v4 as uid } from 'uuid';

export const organizationUserOrgDepartment = {
  departmentId: primaryKey(uid),
  department_name: String,
  department_name_en: String,
  department_abbreviation: String,
  under_department: String,
  taxpayer_identification_number: String,
  county: String,
  address: String,
  email: String,
  phone_number: String,
  phone_number_2: String,
  website: String,
  level_label: String,
  level: String,
  total_user: Number,
  created_dt: String,
  created_by: String,
  updated_dt: String,
  updated_by: String,
};

export const organizationUserOrgDepartmentUser = {
  id: primaryKey(uid),
  departmentId: String,
  userId: String,
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
