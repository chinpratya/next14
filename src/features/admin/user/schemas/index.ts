import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const UserSchema = z.object({
  userId: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  first_name_en: z.string(),
  last_name_en: z.string(),
  email: z.string(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string(),
  updated_by: z.string(),
  phone_number: z.string(),
  status: z.string(),
  employee_classification: z.string(),
  organization_labels: z.array(z.string().nullable()),
  profile_pic: z.string().optional(),
  departmentId: z.string().optional(),
  prefix: z.string().optional(),
  jobId: z.string().optional(),
  job_label: z.string().optional(),
  access_start_date: z.string().optional(),
  access_end_date: z.string().optional(),
  is_access_end_date: z.boolean().optional(),
  agencies_id: z.array(z.string()).optional(),
  agencies_labels: z.array(z.string()).optional(),
  phone_prefix: z.string().optional(),
});

export const UserResponseSchema = ResponseSchema.extend({
  data: z.array(UserSchema),
});

export const UserByIdResponseSchema = z.object({
  data: UserSchema,
  message: z.string(),
  code: z.number(),
});

export const CreateUserResponseSchema = z.object({
  message: z.string(),
  code: z.number(),
  userId: z.string().optional(),
});
export const AddRoleUserSchema = z.object({
  userId: z.string(),
  roleId: z.array(z.string()),
});

export const AddGroupUserSchema = z.object({
  userId: z.string(),
  groupId: z.array(z.string()),
});
export const CreateUserPayloadSchema = z.object({
  profile_pic: z.string(),
  user_info: z.object({
    prefix: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    id_card_number: z.string(),
    email_and_username: z.string(),
    phone_number: z.string(),
    sex: z.string(),
    date_of_birth: z.string(),
    age: z.string(),
  }),
  work_info: z.object({
    organization: z.string(),
    organization_abbreviation: z.string(),
    department: z.string(),
    head_of_department: z.string(),
    position: z.string(),
    employee_type: z.string(),
    employee_no: z.string(),
    start_date: z.string(),
    end_date: z.string(),
  }),
  address: z.object({
    address: z.string(),
    province: z.string(),
    district: z.string(),
    sub_district: z.string(),
    zip_code: z.string(),
  }),
});

export const UserRoleSchema = z.object({
  composite: z.boolean().optional(),
  description: z.string(),
  roleId: z.string(),
  name: z.string(),
});

export const UserRoleResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserRoleSchema),
  });

export const UserGroupSchema = z.object({
  groupId: z.string(),
  name: z.string(),
  name_en: z.string(),
  status: z.string(),
  created_dt: z.string(),
  updated_dt: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
  description: z.string(),
});

export const UserGroupResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserGroupSchema),
  });

export const UserDepartmentSchema = z.object({
  departmentId: z.string(),
  department_name: z.string(),
  department_name_en: z.string(),
  department_type: z.string(),
  department_abbreviation: z.string(),
  department_head: z.string(),
  under_department: z.string(),
  level_label: z.string(),
  level: z.string(),
});
export const UserDepartmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserDepartmentSchema),
  });

export const UserDepartmentAllSchema: z.ZodObject<{
  departmentId: z.ZodString;
  department_type: z.ZodString;
  department_name: z.ZodString;
  department_name_en: z.ZodString;
  department_abbreviation: z.ZodString;
  department_head: z.ZodOptional<z.ZodString>;
  under_department: z.ZodOptional<z.ZodString>;
  level_label: z.ZodString;
  level: z.ZodString;
  total_user: z.ZodOptional<z.ZodNumber>;
  sub_department: z.ZodOptional<
    z.ZodArray<z.ZodLazy<z.ZodTypeAny>>
  >;
}> = z.object({
  departmentId: z.string(),
  department_type: z.string(),
  department_name: z.string(),
  department_name_en: z.string(),
  department_abbreviation: z.string(),
  department_head: z.string().optional(),
  under_department: z.string().optional(),
  level_label: z.string(),
  level: z.string(),
  total_user: z.number().optional(),
  sub_department: z
    .array(z.lazy(() => UserDepartmentAllSchema))
    .optional(),
});

export const UserDepartmentAllResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserDepartmentAllSchema),
  });

export const UserOrganizationSchema = z.object({
  department_name: z.string(),
  department_name_en: z.string(),
  department_abbreviation: z.string(),
  department_type: z.string(),
  department_head: z.string(),
  under_department: z.string(),
  total_user: z.number().optional(),
  lang: z.string().optional(),
  logo: z.string().optional(),
  departmentId: z.string(),
  created_dt: z.string().optional(),
  created_by: z.string().optional(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
  level_label: z.string().optional(),
  level: z.string().optional(),
  is_current: z.boolean(),
});

export const CurrentDepartment = z.object({
  department_name: z.string().optional(),
  department_name_en: z.string().optional(),
  department_abbreviation: z.string().optional(),
  department_type: z.string().optional(),
  department_head: z.string().optional(),
  under_department: z.string().optional(),
  departmentId: z.string().optional(),
  is_current: z.boolean().optional(),
});

export const UserOrganizationResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserOrganizationSchema),
    current_department: CurrentDepartment,
    is_have_department: z.boolean(),
  });

export const SwitchOrganizationResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  token_type: z.string(),
  id_token: z.string(),
  'not-before-policy': z.number(),
  session_state: z.string(),
  scope: z.string(),
});
