import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const RiskMatrixSchema = EntitySchema.extend({
  ObjectUUID: z.string(),
  name: z.string(),
  status: z.string().optional(),
  tagName: z.array(z.string()).optional(),
  assessmentID: z.string().optional(),
});

export const RiskMatrixResponseSchema =
  ResponseSchema.extend({
    data: z.array(RiskMatrixSchema),
  });

export const RiskMatrixChanceSchema = z.object({
  likelihoodID: z.number(),
  name: z.string(),
  description: z.string(),
});

export const RiskMatrixChanceResponseSchema =
  ResponseSchema.extend({
    data: z.array(RiskMatrixChanceSchema),
  });

export const RiskMatrixEffectSchema = z.object({
  effectID: z.number(),
  severity: z.string(),
  name: z.string(),
  effect: z.string().optional(),
  description: z.string(),
});

export const RiskMatrixEffectResponseSchema =
  ResponseSchema.extend({
    data: z.array(RiskMatrixEffectSchema),
  });

export const RiskMatrixScorePointSchema = z.object({
  X: z.number(),
  Y: z.number(),
  color: z.string(),
  value: z.number(),
  isSelect: z.boolean().optional(),
});

export const RiskMatrixScoreRiskDetailSchema = z.object({
  riskID: z.number(),
  name: z.string(),
  description: z.string(),
  score: z.string(),
});

export const RiskMatrixScoreSchema = z.object({
  resolution: z.number(),
  scores: z.array(z.number()),
  color: z.array(z.string()),
  value: z.array(RiskMatrixScorePointSchema),
  riskDetail: z.array(RiskMatrixScoreRiskDetailSchema),
  maxscore: z.string(),
  minscore: z.string(),
});
