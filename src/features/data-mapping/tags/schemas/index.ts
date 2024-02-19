import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const DataMappingTagsSchema = EntitySchema.extend({
  tagID: z.string(),
  name: z.string(),
  organization: z.string(),
  organizationID: z.string(),
  createdDt: z.string(),
  updatedDt: z.string(),
  updatedBy: z.string().optional(),
  createdBy: z.string().optional(),
});

export const DataMappingTagsResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataMappingTagsSchema),
  });
