import { z } from 'zod';

import { ResponseSchema } from '@/schema';
import { ConsentBuilderPurposeSchema } from '@/shared';

export const PreferenceCentersSchema = z.object({
  preferenceID: z.string(),
  name: z.string(),
  status: z.string(),
  version: z.number(),
  createdBy: z.string(),
  createdDt: z.string(),
  updatedBy: z.string().optional(),
  updatedDt: z.string().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
});

export const PreferenceCentersResponseSchema =
  ResponseSchema.extend({
    data: z.array(PreferenceCentersSchema),
  });

export const ActivitySchema = z.object({
  activityID: z.string(),
  activity: z.string(),
});

export const PreferenceCentersDetailSchema = z.object({
  preferenceID: z.string(),
  name: z.string(),
  description: z.string(),
  activitys: z.array(ActivitySchema),
  organizationID: z.string(),
  organization: z.string(),
  delegateID: z.string(),
  delegate: z.string(),
  status: z.string(),
  version: z.number(),
  isCreateNewUser: z.boolean(),
  createdBy: z.string(),
  createdDt: z.string(),
  updatedBy: z.string().optional(),
  updatedDt: z.string().optional(),
});

export const ConsentPreferenceActivitySchema = z.object({
  activityID: z.string(),
  activity: z.string(),
  purposes: z.array(ConsentBuilderPurposeSchema),
});
