import { z } from 'zod';

export const RightsStageSchema = z.object({
  stageID: z.string().optional(),
  stateID: z.string().optional(),
  name: z.string().optional(),
  stageName: z.string().optional(),
  order: z.number(),
  set_start_time: z.boolean(),
  auto_complete: z.boolean(),
  sent_email_if_start: z.boolean(),
  sent_email_if_complete: z.boolean(),
});

export const RiskLikelihoodSchema = z.object({
  ObjectUUID: z.number(),
  name: z.string(),
  description: z.string(),
});

export const RiskEffectSchema = z.object({
  ObjectUUID: z.number(),
  severity: z.string(),
  effect: z.string(),
  description: z.string(),
});
export const RiskScorePointSchema = z.object({
  X: z.number(),
  Y: z.number(),
  color: z.string(),
  value: z.number(),
  isSelect: z.boolean().optional(),
});

export const RiskAssessmentDetailSchema = z.object({
  riskID: z.number(),
  name: z.string(),
  score: z.string(),
  isCurrenct: z.boolean(),
  description: z.string(),
});
