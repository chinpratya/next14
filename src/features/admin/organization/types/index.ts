import { z } from 'zod';

import {
  OrganizationManagementSchema,
  OrganizationManagementResponseSchema,
  OrganizationLevelSchema,
  OrganizationLevelResponseSchema,
  OrganizationUserSchema,
  OrganizationUserResponseSchema,
} from '../schemas';

export type OrganizationManagement = z.infer<
  typeof OrganizationManagementSchema
>;

export type OrganizationManagementResponse = z.infer<
  typeof OrganizationManagementResponseSchema
>;

export type OrganizationLevel = z.infer<
  typeof OrganizationLevelSchema
>;

export type OrganizationLevelResponse = z.infer<
  typeof OrganizationLevelResponseSchema
>;

export type OrganizationUser = z.infer<
  typeof OrganizationUserSchema
>;

export type OrganizationUserResponse = z.infer<
  typeof OrganizationUserResponseSchema
>;
