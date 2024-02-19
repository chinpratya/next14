import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const MeasureSchema = EntitySchema.extend({
  tagName: z.array(z.string()),
  tagID: z.array(z.string()),
  name: z.string(),
  ObjectUUID: z.string(),
  measuredID: z.string().optional(),
});

export const MeasuresResponseSchema =
  ResponseSchema.extend({
    data: z.array(MeasureSchema),
  });

export const MeasureFormSchema = z.object({
  measuredhtml: z.string(),
});
