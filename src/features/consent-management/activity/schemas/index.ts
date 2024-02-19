import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const ActivityPurposeSchema = EntitySchema.extend({
  purposeID: z.string(),
  name: z.string(),
  group: z.string(),
  version: z.number(),
  createdBy: z.string(),
  createdDt: z.string(),
  updatedBy: z.string().optional(),
  updatedDt: z.string().optional(),
});

export const ActivityPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityPurposeSchema),
  });

export const PreferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  attributeTypeID: z.string(),
  choices: z.array(z.string()),
});

export const ActivityPreviewSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  description: z.string(),
  displayType: z.string(),
  preferences: z.array(PreferenceSchema),
});

export const ActivityPurposeDetailSchema = z.object({
  dataCategoryID: z.string(),
  name: z.string(),
  group: z.string(),
  status: z.string(),
  DataClassification: z.array(z.string()),
  Organization: z.string(),
});
