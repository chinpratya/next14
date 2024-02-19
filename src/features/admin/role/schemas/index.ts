import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const RoleSchema = z.object({
  roleId: z.string(),
  name: z.string(),
  name_en: z.string(),
  status: z.string(),
  description: z.string(),
  created_dt: z.string(),
  created_by: z.string(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
});

export const RoleResponseSchema = ResponseSchema.extend({
  data: z.array(RoleSchema),
});

export const RolePermissionBaseSchema = z.object({
  composite: z.boolean().optional(),
  attributes: z.record(z.unknown()).optional(),
  permissionId: z.string().optional(),
  containerId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  prefix: z.string().optional(),
  product: z.string().optional(),
  module: z.string().optional(),
  page: z.string().optional(),
  code_name: z.string().optional(),
  action: z.string().optional(),
});

export const RolePermissionPageSchema = z.object({
  name: z.string(),
  description: z.string(),
  children: z.object({
    access: RolePermissionBaseSchema.optional(),
    create: RolePermissionBaseSchema.optional(),
    delete: RolePermissionBaseSchema.optional(),
    read: RolePermissionBaseSchema.optional(),
    update: RolePermissionBaseSchema.optional(),
    import: RolePermissionBaseSchema.optional(),
    export: RolePermissionBaseSchema.optional(),
  }),
});

export const RolePermissionModuleSchema = z.object({
  name: z.string(),
  description: z.string(),
  children: z.array(RolePermissionPageSchema).optional(),
});

export const RolePermissionAppSchema = z.object({
  name: z.string(),
  description: z.string(),
  children: z
    .array(RolePermissionModuleSchema)
    .optional(),
});
