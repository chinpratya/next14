import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const LogSearchIndiceSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const LogSearchHostSchema =
  LogSearchIndiceSchema.extend({});

export const LogSearchIndiceResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(LogSearchIndiceSchema),
  });

export const LogSearchHostResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(LogSearchHostSchema),
  });

export const LogSearchPayloadSchema = z.object({
  search: z.string().optional(),
  filters: z.array(z.any()).optional(),
  indices: z.string().optional(),
  hostname: z.array(z.string()),
  type: z.string(),
  limit: z.number().optional(),
  page: z.number().optional(),
  enabled: z.boolean(),
  offset: z.number().optional(),
});

export const LogSearchSchema = z.object({
  _id: z.string(),
  _ignored: z.array(z.string()).optional(),
  _index: z.string().optional(),
  _score: z.any().nullable(),
  _source: z.any(),
  sort: z.array(z.number()),
});

export const LogSearchResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(LogSearchSchema),
  });

export const FieldSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FieldSchemaResponse = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  })
);
