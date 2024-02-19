import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const ActivityDsarSchema = z.object({
  activityName: z.string(),
  createdDt: z.string(),
  endDate: z.string(),
  identify: z.string(),
  identifyType: z.string(),
  isOvertime: z.boolean(),
  numberOfEnd: z.number(),
  requestID: z.string(),
  requestStatus: z.string(),
  tagID: z.array(z.string()),
  tagName: z.array(z.string()),
  timeReminded: z.string(),
  typeOfRequest: z.string(),
  workflowName: z.string(),
});

export const ActivityDsarResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDsarSchema),
  });
