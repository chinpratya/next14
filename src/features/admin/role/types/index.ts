import { z } from 'zod';

import {
  RoleSchema,
  RoleResponseSchema,
  RolePermissionBaseSchema,
  RolePermissionPageSchema,
  RolePermissionModuleSchema,
  RolePermissionAppSchema,
} from '../schemas';

export type Role = z.infer<typeof RoleSchema>;

export type RoleResponse = z.infer<
  typeof RoleResponseSchema
>;

export type RolePermissionBase = z.infer<
  typeof RolePermissionBaseSchema
>;

export type RolePermissionPage = z.infer<
  typeof RolePermissionPageSchema
>;

export type RolePermissionModule = z.infer<
  typeof RolePermissionModuleSchema
>;

export type RolePermissionApp = z.infer<
  typeof RolePermissionAppSchema
>;
