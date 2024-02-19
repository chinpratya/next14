import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const ProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  email_verified: z.string(),
  prefix_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  phone_prefix: z.string(),
  time_zone: z.string(),
  datetime_format: z.string(),
});

export const SessionSchema = z.object({
  session_id: z.string(),
  ip_address: z.string(),
  start: z.number().optional(),
  last_access: z.number().optional(),
  remember_me: z.boolean().optional(),
  device: z.string(),
  device_version: z.string(),
});

export const SessionResponseSchema =
  ResponseSchema.extend({
    data: z.array(SessionSchema),
  });

export const UserGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  description: z.string().optional(),
});

export const UserGroupResponseSchema =
  ResponseSchema.extend({
    data: z.array(UserGroupSchema),
  });

export const RoleSchema = EntitySchema.extend({
  roleId: z.string(),
  name: z.string(),
  name_en: z.string().optional(),
  status: z.string(),
  description: z.string(),
});

export const RoleResponseSchema = ResponseSchema.extend({
  data: z.array(RoleSchema),
});

export const UserMetaSchema = z.object({
  tenant: z.string(),
  prefix: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      name_en: z.string(),
    })
  ),
  time_zone: z.array(z.string()),
  datetime_format: z.array(
    z.object({
      label: z.string(),
      datetime_intl: z.string(),
      datetime_strftime: z.string(),
    })
  ),
  required_action: z.array(
    z.object({
      alias: z.string(),
      name: z.string(),
      providerId: z.string(),
    })
  ),
});
