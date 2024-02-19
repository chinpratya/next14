import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const ActivityConsentSchema = z.object({
  receiptsID: z.string(),
  dataSubjectID: z.string(),
  dataSubject: z.string(),
  email: z.string(),
  status: z.string(),
  collectionPointID: z.string(),
  collectionPoint: z.string(),
  version: z.string(),
  CollectionMethod: z.string(),
  activityGroup: z.string(),
  dataController: z.string(),
  timestamp: z.string(),
  type: z.string(),
  identify: z.string(),
  activity: z.string(),
  verify: z.boolean(),
  policyName: z.string(),
  policyLink: z.string().optional(),
  policyVersion: z.string(),
  isCurrent: z.boolean().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
  massage: z.string().optional(),
  channel: z.string().optional(),
});

export const ActivityConsentResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityConsentSchema),
  });
