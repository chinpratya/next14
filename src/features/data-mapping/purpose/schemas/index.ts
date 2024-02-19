import { z } from 'zod';

import {
  ResponseSchema,
  EntitySchema,
} from '@/schema/response';

export const DataUsagePeriodPurposeSchema = z.object({
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  value: z.number().optional(),
  type: z.string().optional(),
  description: z.string(),
});
export const PurposeSchema = EntitySchema.extend({
  purposeID: z.string(),
  name: z.string(),
  group: z.string(),
  groupID: z.string().optional(),
  legalBasis: z.array(z.string()),
  status: z.string(),
  organization: z.string().optional(),
  organizationID: z.string(),
  version: z.number(),
  isConsent: z.boolean().optional(),
  consentDetail: z.string().optional(),
  dataUsagePeriod:
    DataUsagePeriodPurposeSchema.optional(),
  isDataUsagePeriod: z.boolean().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
});

export const PurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(PurposeSchema),
  });

export const PurposeHistorySchema = EntitySchema.extend({
  historyID: z.string(),
  purposeID: z.string(),
  name: z.string(),
  group: z.string(),
  groupID: z.string().optional(),
  status: z.string(),
  version: z.number(),
  organization: z.string().optional(),
  organizationID: z.string(),
  isConsent: z.boolean().optional(),
  consentDetail: z.string().optional(),
});

export const PurposeHistoryResponseSchema =
  ResponseSchema.extend({
    data: z.array(PurposeHistorySchema),
  });

export const PurposeUpdateResponseSchema =
  ResponseSchema.extend({
    purposeID: z.string(),
  });
