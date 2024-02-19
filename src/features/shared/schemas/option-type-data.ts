import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const OptionTypeDataSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const OptionTypeDataListResponseSchema =
  ResponseSchema.extend({
    data: z.array(OptionTypeDataSchema),
  });
