import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const BackupDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  scheduler: z.string(),
  enabled: z.boolean(),
  backup: z.object({
    config: z.boolean(),
    logs: z.boolean(),
  }),
  status: z.string(),
  created_date: z.string(),
  created_by: z.string(),
  update_date: z.string(),
  update_by: z.string(),
});

export const BackupDataInfoSchema =
  BackupDataSchema.extend({
    organization: z.string(),
    provider: z.object({
      type: z.string(),
      username: z.string(),
      password: z.string(),
      host: z.string(),
      region: z.string(),
      name: z.string(),
    }),
    scheduler: z.object({
      type: z.string(),
      crontab: z.string(),
      last_time: z.string(),
    }),
  });

export const BackupDataActivitySchema = z.object({
  id: z.string(),
  backup_id: z.string(),
  provider: z.string(),
  backup: z.object({
    logs: z.boolean(),
    config: z.boolean(),
  }),
  message: z.string(),
  status: z.string(),
  created_date: z.string(),
  created_by: z.string(),
});

export const BackupDataResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(BackupDataSchema),
  });

export const BackupDataActivityResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(BackupDataActivitySchema),
  });
