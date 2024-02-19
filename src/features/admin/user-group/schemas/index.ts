import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const GroupRoleSchema = z.object({
  roleId: z.string(),
  name: z.string(),
  name_en: z.string(),
  status: z.string(),
  description: z.string(),
  created_dt: z.string().optional(),
  created_by: z.string().optional(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
});

export const GroupRoleResponseSchema =
  ResponseSchema.extend({
    data: z.array(GroupRoleSchema),
  });

export const GroupUserSchema = z.object({
  userId: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  first_name_en: z.string(),
  last_name_en: z.string(),
  email: z.string(),
  phone_number: z.string(),
  employee_classification: z.string(),
  status: z.string(),
  created_dt: z.string().optional(),
  created_by: z.string().optional(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
  organization_labels: z.array(z.string().nullable()),
});

export const GroupUserResponseSchema =
  ResponseSchema.extend({
    data: z.array(GroupUserSchema),
  });

export const GroupSchema = z.object({
  groupId: z.string(),
  name: z.string(),
  name_en: z.string(),
  description: z.string().optional(),
  total_user: z.number(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
});

export const GroupResponseSchema = ResponseSchema.extend({
  data: z.array(GroupSchema),
});
