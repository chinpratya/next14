import { z } from 'zod';

import { EntitySchema } from '@/schema/response';

export const StratumSchema = z.object({
  stat: z.string(),
  timestamp: z.string(),
  timezone: z.string(),
});

export const SettingSchema = EntitySchema.extend({
  id: z.string(),
  hosts: z.array(z.string()).nullable(),
  organization: z.string(),
  timezone: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  log: z
    .object({
      compression_type: z.string(),
      hash_type: z.string(),
    })
    .optional(),
  engine: z.array(z.string()).nullable().optional(),
});
