import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const ArchiveSchema = z.object({
  is: z.boolean(),
  note: z.string(),
  date: z.string(),
  created_by: z.string(),
  created_date: z.string(),
});

export const DirectorySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  hour: z.string().optional(),
  archive: ArchiveSchema.optional().or(
    z.boolean().optional()
  ),
  hashing: z
    .object({
      md5: z.string().optional(),
      sh1: z.string().optional(),
    })
    .optional(),
  label: z.string().optional(),
  value: z.string().optional(),
  created_date: z.string().optional(),
  size: z.number().optional(),
});

export const DirectoryLevelSchema = z.enum([
  'index',
  'date',
  'hour',
  'hostname',
  'file',
]);

export const DirectoryResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(DirectorySchema),
  });

export const ExplorerDownloadSchema = z.object({
  id: z.string(),
  files: z.array(z.string()),
  link: z.string(),
  progress: z.number(),
  name: z.string(),
  status: z.enum([
    'RUNNING',
    'SUCCESS',
    'ERROR',
    'CANCEL',
    'WAITING',
  ]),
});

export const ExplorerDownloadResponseSchema = z.array(
  ExplorerDownloadSchema
);
