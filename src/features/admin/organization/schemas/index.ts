import { z } from 'zod';

import { ResponseSchema } from '@/schema';

import { UserSchema } from '../../user';

export const OrganizationManagementSchema: z.ZodObject<{
  departmentId: z.ZodString;
  department_name: z.ZodString;
  department_name_en: z.ZodString;
  department_abbreviation: z.ZodString;
  logo: z.ZodOptional<z.ZodString>;
  under_department: z.ZodOptional<z.ZodString>;
  level_label: z.ZodOptional<z.ZodString>;
  level: z.ZodOptional<z.ZodString>;
  total_user: z.ZodOptional<z.ZodNumber>;
  sub_department: z.ZodOptional<
    z.ZodArray<z.ZodLazy<z.ZodTypeAny>>
  >;
  taxpayer_identification_number: z.ZodOptional<z.ZodString>;
  county: z.ZodOptional<z.ZodString>;
  address: z.ZodOptional<z.ZodString>;
  email: z.ZodOptional<z.ZodString>;
  phone_number: z.ZodOptional<z.ZodString>;
  phone_number_2: z.ZodOptional<z.ZodString>;
  website: z.ZodOptional<z.ZodString>;
  lang: z.ZodOptional<z.ZodString>;
  created_dt: z.ZodString;
  created_by: z.ZodString;
  updated_dt: z.ZodOptional<z.ZodString>;
  updated_by: z.ZodOptional<z.ZodString>;
}> = z.object({
  departmentId: z.string(),
  department_name: z.string(),
  department_name_en: z.string(),
  department_abbreviation: z.string(),
  logo: z.string().optional(),
  under_department: z.string().optional(),
  level_label: z.string().optional(),
  level: z.string().optional(),
  total_user: z.number().optional(),
  sub_department: z
    .array(z.lazy(() => OrganizationManagementSchema))
    .optional(),
  taxpayer_identification_number: z.string().optional(),
  county: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  phone_number_2: z.string().optional(),
  website: z.string().optional(),
  lang: z.string().optional(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
});

export const OrganizationLevelSchema: z.ZodObject<{
  levelId: z.ZodString;
  underId: z.ZodString;
  label_th: z.ZodString;
  label_en: z.ZodString;
  type: z.ZodString;
  created_dt: z.ZodString;
  created_by: z.ZodString;
  updated_dt: z.ZodOptional<z.ZodString>;
  updated_by: z.ZodOptional<z.ZodString>;
  level: z.ZodOptional<z.ZodNumber>;
  child: z.ZodOptional<
    z.ZodArray<z.ZodLazy<z.ZodTypeAny>>
  >;
}> = z.object({
  levelId: z.string(),
  underId: z.string(),
  label_th: z.string(),
  label_en: z.string(),
  type: z.string(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
  level: z.number().optional(),
  child: z
    .array(z.lazy(() => OrganizationLevelSchema))
    .optional(),
});

export const OrganizationUserSchema = UserSchema;

export const OrganizationManagementResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationManagementSchema),
  });

export const OrganizationLevelResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationLevelSchema),
  });

export const OrganizationUserResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationUserSchema),
  });
