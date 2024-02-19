import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

import { PreviewTemplateOfRiskAssessmentSchema } from '../../template-risk';

export const ActivitySchema = EntitySchema.extend({
  ObjectUUID: z.string(),
  name: z.string(),
  type: z.string(),
  group: z.string(),
  groupName: z.string(),
  riskscore: z.string(),
  status: z.string(),
  tag: z.array(z.string()),
  tagName: z.array(z.string()),
});

export const ActivityResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivitySchema),
  });

export const ActivityOfAssessmentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  rawScore: z.number(),
  score: z.string(),
  riskname: z.string(),
});

export const ActivityOfAssessmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityOfAssessmentSchema),
  });

export const ActivityOfAssessmentDetailMeasureSchema =
  z.object({
    name: z.string(),
    measureID: z.string(),
    tagName: z.array(z.string()).optional(),
  });

export const ActivityOfAssessmentDetailSchema =
  PreviewTemplateOfRiskAssessmentSchema.extend({
    measure: z.array(
      ActivityOfAssessmentDetailMeasureSchema
    ),
    note: z.string().optional(),
  });
