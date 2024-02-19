import { z } from 'zod';

import {
  ConsentFormSchema,
  EntitySchema,
  ResponseSchema,
  LanguageSchema,
  MetaSchema,
} from '@/schema';

import {
  RightsStageSchema,
  RiskEffectSchema,
  RiskLikelihoodSchema,
  RiskScorePointSchema,
  RiskAssessmentDetailSchema,
} from '../../shared';
import { TaskSchema } from '../../task';

export const RequestSchema = EntitySchema.extend({
  requestID: z.string(),
  typeOfRequest: z.string(),
  identify: z.string(),
  identifyType: z.string().optional(),
  workflowName: z.string(),
  requestStatus: z.string().optional(),
  numberOfEnd: z.object({
    type: z.string(),
    value: z.number(),
  }),
  endDate: z.string(),
  timeReminded: z.string(),
  tagName: z.array(z.string()),
  tagID: z.array(z.string()),
  isOvertime: z.boolean().optional(),
  riskAssessmentValue: z.string().optional(),
});

export const RequestResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestSchema),
  });

export const RequestDetailSchema = RequestSchema.omit({
  activityName: true,
  workflowName: true,
}).extend({
  requestState: z.string(),
  webformName: z.string(),
  workflowID: z.string().optional(),
  activityName: z.string().optional(),
  activityID: z.string().optional(),
  currecnt_stateID: z.string(),
  currecnt_state: z.number(),
  states: z.array(RightsStageSchema),
  DoubleOptIn: z.boolean().optional(),
  reason: z.string().optional(),
  requestStatus: z.string().optional(),
  massage: z.string().optional(),
  isPermission: z.boolean().optional(),
  showSentTemplate: z.boolean(),
  showRiskAssessment: z.boolean(),
  isSentTemplate: z.boolean().optional(),
});

export const ReasonForStatusSchema = MetaSchema.extend({
  reason: z.array(MetaSchema),
});

export const RequestMetaSchema = z.object({
  language: z.array(LanguageSchema),
  status: z.array(MetaSchema),
  reasonForStatus: z.array(ReasonForStatusSchema),
});

export const RequestVersionDataSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  requestID: z.string().optional(),
  time: z.string().optional(),
  oldLang: z.string().optional(),
  newLang: z.string().optional(),
  oldTime: z.string().optional(),
  newTime: z.string().optional(),
  oldApproved: z.string().optional(),
  newApproved: z.string().optional(),
  oldStatus: z.string().optional(),
  newStatus: z.string().optional(),
  oldstate: z.string().optional(),
  newstate: z.string().optional(),
  approved: z.string().optional(),
  assigned: z.string().optional(),
  oldState: z.string().optional(),
  newState: z.string().optional(),
});

export const RequestVersionSchema = z.object({
  version: z.array(
    z.object({
      type: z.string(),
      data: RequestVersionDataSchema,
    })
  ),
});

export const RequestFormSchema = z.object({
  formTemplate: ConsentFormSchema,
});

export const RequestTaskSchema = TaskSchema;

export const DocumentSchema = z.object({
  filepath: z.string(),
  name: z.string(),
  description: z.string(),
});
export const RequestVerificationSchema = z.object({
  identifyID: z.string(),
  name: z.string(),
  comment: z.string(),
  status: z.string(),
  result: z.string(),
  updateDt: z.string(),
  verificationType: z.string().optional(),
  description: z.string().optional(),
  document: z.array(DocumentSchema).optional(),
});

export const RequestVerificationResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestVerificationSchema),
  });

export const RequestRiskMatrixSchema = z.object({
  likelihood: z.array(RiskLikelihoodSchema),
  likelihoodValue: z.number(),
  effect: z.array(RiskEffectSchema),
  effectValue: z.number(),
  value: z.array(RiskScorePointSchema),
  color: z.array(z.string()),
  scores: z.array(z.number()),
  resolution: z.number(),
  maxScore: z.number(),
  minScore: z.number(),
  riskAssessmentValue: z.string(),
  riskDetail: z.array(RiskAssessmentDetailSchema),
});
