import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const IncidentSchema = z.object({
  id: z.string(),
  indices: z.string(),
  rule_name: z.string(),
  severity: z.string(),
  assignes: z
    .array(
      z.object({
        _id: z.string(),
        email: z.string(),
      })
    )
    .nullable(),
  assign_status: z.string(),
  code: z.string().optional(),
  created_by: z.string(),
  created_date: z.string(),
});

export const IncidentInfoSchema = IncidentSchema.extend({
  organization: z.string(),
  description: z.string(),
  tags: z.array(z.string()).nullable(),
  incident: z
    .record(z.string(), z.any())
    .or(z.array(z.record(z.string(), z.any()))),
  indices: z.string(),
  status: z.string(),
  code: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
  condition: z.string().optional(),
  total_record: z.number(),
  data: z.array(z.record(z.any())).optional().nullable(),
  detection_time: z.object({
    start_date: z.string(),
    end_date: z.string(),
  }),
});

export const IncidentLogFieldSchema = z.object({
  list: z.array(z.string()),
  selected: z.array(z.string()),
  search: z.string(),
  checkedAll: z.boolean(),
});

export const IncidentResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(IncidentSchema),
  });

export const IncidentInfoResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: IncidentInfoSchema,
  });
