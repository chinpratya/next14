import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const DataElementSchema = EntitySchema.extend({
  dataElementID: z.string(),
  name: z.string(),
  dataClassificationID: z.string(),
  dataClassification: z.string(),
  organization: z.string(),
});

export const DataElementMetaSchema = z.object({
  dataClassification: z.array(
    z.object({
      ObjectUUID: z.string(),
      name: z.string(),
    })
  ),
});

export const DataElementResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataElementSchema),
  });
