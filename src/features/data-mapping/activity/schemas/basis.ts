import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const ActivityBasisDetailSchema = z.object({
  description: z.string(),
  fileUrl: z.array(z.string()),
});

export const ActivityBasisSchema = z.object({
  activityID: z.string(),
  basisID: z.string(),
  description: z.string(),
  fileID: z.array(z.string()),
  fileUrl: z.array(z.string()),
  detail: z.array(ActivityBasisDetailSchema),
});

export const DataUsagePeriodItemSchema = z.object({
  day: z.number(),
  month: z.number(),
  year: z.number(),
  description: z.string(),
});

export const ActivityBasisPurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  group: z.string(),
  dataUsagePeriod: DataUsagePeriodItemSchema,
  basisID: z.string(),
  description: z.string().optional(),
  fileID: z.array(z.string()).optional(),
  fileUrl: z.array(z.string()).optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
});

export const ActivityBasisPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityBasisPurposeSchema),
  });

export const DataElementsItemSchema = z.object({
  dataElementID: z.string(),
  name: z.string(),
  classificationID: z.string(),
  classificationName: z.string(),
});

export const ActivityBasisPurposeDataCategorySchema =
  z.object({
    dataCategoryID: z.string(),
    name: z.string(),
    dataElements: z.array(DataElementsItemSchema),
    dataClassification: z.array(z.string()),
  });

export const ActivityBasisPurposeDataCategoryResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityBasisPurposeDataCategorySchema),
  });
