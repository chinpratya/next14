import { z } from 'zod';

import {
  GroupSchema,
  GroupResponseSchema,
  GroupRoleSchema,
  GroupRoleResponseSchema,
  GroupUserSchema,
  GroupUserResponseSchema,
} from '../schemas';

export type Group = z.infer<typeof GroupSchema>;

export type GroupResponse = z.infer<
  typeof GroupResponseSchema
>;

export type GroupRole = z.infer<typeof GroupRoleSchema>;

export type GroupRoleResponse = z.infer<
  typeof GroupRoleResponseSchema
>;

export type GroupUser = z.infer<typeof GroupUserSchema>;

export type GroupUserResponse = z.infer<
  typeof GroupUserResponseSchema
>;
