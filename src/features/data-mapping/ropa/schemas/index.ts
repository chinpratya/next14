import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const RopaSchema = EntitySchema.extend({
  ropaID: z.string(),
  version: z.number(),
  actorTypeID: z.array(z.string()),
  actorType: z.array(z.string()),
  tagID: z.array(z.string()),
  tagName: z.array(z.string()),
  created_by: z.string(),
  created_dt: z.string(),
  updated_by: z.string().optional(),
  updated_dt: z.string().optional(),
});

export const RopaResponseSchema = ResponseSchema.extend({
  data: z.array(RopaSchema),
});

export const RopaExportSchema = ResponseSchema.extend({
  ropaDetail: z.array(z.any()),
  url: z.string(),
});
export const RopaDetailSchema = EntitySchema.extend({
  ropaID: z.string(),
  activityID: z.string(),
  name: z.string(),
  description: z.string(),
  actor: z.string(),
  group: z.string(),
  status: z.string(),
  owner: z.string(),
  tagID: z.string().optional(),
  tagName: z.string().optional(),
  organization: z.string(),
  created_by: z.string(),
  created_dt: z.string(),
  updated_by: z.string().optional(),
  updated_dt: z.string().optional(),
});

export const RopaDetailResponseSchema =
  ResponseSchema.extend({
    data: z.object({
      activity: z.array(RopaDetailSchema),
      basicinfo: z.object({
        type: z.string(),
        name: z.string(),
        tagID: z.array(z.string()),
        tagName: z.array(z.string()).optional(),
      }),
    }),
  });
