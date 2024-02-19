import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const notifySchema = z.object({
  _id: z.string(),
  module: z.string().optional(),
  name: z.string(),
  provider: z.string(),
  sender: z.array(z.string()).nullable().optional(),
  config_default: z.boolean().optional(),
  configuration: z
    .object({
      host: z.string().optional(),
      port: z.number().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
      is_auth: z.boolean().optional(),
      transport: z.string().optional(),
      endpoint: z.string().optional(),
      access_token: z.string().optional(),
      secret_token: z.string().optional(),
      header: z.array(z.any()).nullable().optional(),
    })
    .nullable()
    .optional(),
  created_by: z.string().optional(),
  status: z.string(),
  created_date: z.string(),
  organization: z.string(),
  enabled: z.boolean().nullable().optional(),
});

export const notifyResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(notifySchema),
  });
