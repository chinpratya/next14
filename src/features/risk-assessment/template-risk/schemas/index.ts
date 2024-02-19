import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const TemplateRiskSchema = EntitySchema.extend({
  assessmentId: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.string(),
});

export const TemplateRiskResponseSchema =
  ResponseSchema.extend({
    data: z.array(TemplateRiskSchema),
  });

export const MetaOptionTypeSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});
export const TemplateRiskMetaSchema = z.object({
  type: z.array(MetaOptionTypeSchema),
  status: z.array(MetaOptionTypeSchema).optional(),
});

export const TemplateRiskDetailSchema =
  EntitySchema.extend({
    assessmentId: z.string(),
    name: z.string(),
    type: z.string(),
    type_label: z.string().optional(),
    status: z.string(),
    description: z.string(),
  });

export const TemplateRiskLikelihoodSchema = z.object({
  ObjectUUID: z.number(),
  likelihoodID: z.number(),
  name: z.string(),
  description: z.string(),
});

export const TemplateRiskLikelihoodResponseSchema =
  ResponseSchema.extend({
    data: z.array(TemplateRiskLikelihoodSchema),
  });

export const TemplateRiskEffectTableSchema = z.object({
  tableID: z.number(),
  severity: z.string(),
  effect: z.string(),
  description: z.string(),
  effectId: z.string().optional(),
});

export const TemplateRiskEffectSchema = z.object({
  effectId: z.string(),
  name: z.string(),
  table: z.array(TemplateRiskEffectTableSchema),
});

export const TemplateRiskEffectResponseSchema =
  ResponseSchema.extend({
    data: z.array(TemplateRiskEffectSchema),
  });

export const TemplateRiskScorePointSchema = z.object({
  X: z.number(),
  Y: z.number(),
  color: z.string(),
  value: z.number(),
  isSelect: z.boolean().optional(),
});

export const TemplateRiskScoreRiskDetailSchema = z.object(
  {
    riskID: z.number(),
    name: z.string(),
    description: z.string(),
    score: z.string(),
  }
);

export const TemplateRiskScoreSchema = z.object({
  resolution: z.number(),
  scores: z.array(z.number()),
  color: z.array(z.string()),
  value: z.array(TemplateRiskScorePointSchema),
  riskDetail: z.array(TemplateRiskScoreRiskDetailSchema),
  maxscore: z.number(),
  minscore: z.number(),
});

export const TemplateOfRiskAssessmentLikelihoodSchema =
  z.object({
    likelihoodID: z.number(),
    name: z.string(),
    description: z.string(),
  });

export const TemplateOfRiskAssessmentRiskDetailSchema =
  z.object({
    riskDetailID: z.number(),
    name: z.string(),
    description: z.string(),
    score: z.string(),
  });

export const TemplateOfRiskAssessmentEffectSchema =
  z.object({
    effectID: z.string(),
    name: z.string(),
    table: z.array(TemplateRiskEffectTableSchema),
  });

export const TemplateOfRiskAssessmentSchema =
  EntitySchema.extend({
    likelihood: z.array(
      TemplateOfRiskAssessmentLikelihoodSchema
    ),
    effect: z.array(TemplateOfRiskAssessmentEffectSchema),
    riskDetail: z.array(
      TemplateOfRiskAssessmentRiskDetailSchema
    ),
  });

export const PreviewTemplateOfRiskAssessmentSchema =
  z.object({
    likelihood: TemplateOfRiskAssessmentLikelihoodSchema,
    effect: z.array(
      TemplateOfRiskAssessmentEffectSchema.extend({
        table: TemplateRiskEffectTableSchema,
      })
    ),
    riskDetail: TemplateOfRiskAssessmentRiskDetailSchema,
  });
