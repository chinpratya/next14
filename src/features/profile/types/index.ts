import { z } from 'zod';

import {
  ProfileSchema,
  SessionSchema,
  SessionResponseSchema,
  RoleSchema,
  RoleResponseSchema,
  UserGroupSchema,
  UserGroupResponseSchema,
  UserMetaSchema,
} from '../schemas/index';

export type Profile = z.infer<typeof ProfileSchema>;

export type Session = z.infer<typeof SessionSchema>;

export type SessionResponse = z.infer<
  typeof SessionResponseSchema
>;

export type Role = z.infer<typeof RoleSchema>;

export type RoleResponse = z.infer<
  typeof RoleResponseSchema
>;

export type UserGroup = z.infer<typeof UserGroupSchema>;

export type UserGroupResponse = z.infer<
  typeof UserGroupResponseSchema
>;

export type UserMeta = z.infer<typeof UserMetaSchema>;

export type ProfileInfoSubmitPayload = {
  phone_number?: string;
  phone_prefix?: string;
};
