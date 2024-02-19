import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const PositionItemSchema = z.object({
  positionId: z.string(),
  name: z.string(),
  name_en: z.string(),
  description: z.string(),
  created_dt: z.string(),
  updated_dt: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
});

export const PositionSchema = PositionItemSchema.extend({
  children: z.array(PositionItemSchema).optional(),
});

export const PositionResponseSchema =
  ResponseSchema.extend({
    data: z.array(PositionSchema),
  });
