import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const ArchiveSchema = z.object({
  id: z.string(),
  name: z.string(),
  organization: z.string(),
  indices: z.string(),
  path: z.string(),
  type: z.string(),
  archive: z.number(),
  note: z.string(),
  status: z.string(),
  created_by: z.string(),
  created_date: z.string(),
});

export const LogFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  label: z.string().optional(),
  hashing: z.record(z.string(), z.string()),
  archive: z.object({
    is: z.boolean(),
    note: z.string(),
    date: z.string(),
    created_by: z.string(),
    created_date: z.string(),
  }),
  created_date: z.string(),
  size: z.number(),
});

export const ArchiveResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(ArchiveSchema),
  });
