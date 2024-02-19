import { z } from 'zod';

import {
  TemplateRiskSchema,
  TemplateRiskResponseSchema,
  TemplateRiskMetaSchema,
  TemplateRiskDetailSchema,
  TemplateRiskLikelihoodResponseSchema,
  TemplateRiskLikelihoodSchema,
  TemplateRiskEffectResponseSchema,
  TemplateRiskEffectSchema,
  TemplateRiskEffectTableSchema,
  TemplateRiskScoreSchema,
  TemplateRiskScorePointSchema,
  TemplateRiskScoreRiskDetailSchema,
  TemplateOfRiskAssessmentLikelihoodSchema,
  TemplateOfRiskAssessmentRiskDetailSchema,
  TemplateOfRiskAssessmentEffectSchema,
  TemplateOfRiskAssessmentSchema,
  PreviewTemplateOfRiskAssessmentSchema,
} from '../schemas';

export type TemplateRisk = z.infer<
  typeof TemplateRiskSchema
>;

export type TemplateRiskResponse = z.infer<
  typeof TemplateRiskResponseSchema
>;

export type TemplateRiskMeta = z.infer<
  typeof TemplateRiskMetaSchema
>;

export type TemplateRiskDetail = z.infer<
  typeof TemplateRiskDetailSchema
>;

export type TemplateRiskLikelihoodResponse = z.infer<
  typeof TemplateRiskLikelihoodResponseSchema
>;

export type TemplateRiskLikelihood = z.infer<
  typeof TemplateRiskLikelihoodSchema
>;

export type TemplateRiskEffectResponse = z.infer<
  typeof TemplateRiskEffectResponseSchema
>;

export type TemplateRiskEffect = z.infer<
  typeof TemplateRiskEffectSchema
>;

export type TemplateRiskEffectTable = z.infer<
  typeof TemplateRiskEffectTableSchema
>;

export type TemplateRiskScorePoint = z.infer<
  typeof TemplateRiskScorePointSchema
>;

export type TemplateRiskScore = z.infer<
  typeof TemplateRiskScoreSchema
>;

export type TemplateRiskScoreRiskDetail = z.infer<
  typeof TemplateRiskScoreRiskDetailSchema
>;

export type TemplateOfRiskAssessmentLikelihood = z.infer<
  typeof TemplateOfRiskAssessmentLikelihoodSchema
>;

export type TemplateOfRiskAssessmentRiskDetail = z.infer<
  typeof TemplateOfRiskAssessmentRiskDetailSchema
>;

export type TemplateOfRiskAssessmentEffect = z.infer<
  typeof TemplateOfRiskAssessmentEffectSchema
>;

export type TemplateOfRiskAssessmentType = z.infer<
  typeof TemplateOfRiskAssessmentSchema
>;

export type PreviewTemplateOfRiskAssessmentType = z.infer<
  typeof PreviewTemplateOfRiskAssessmentSchema
>;
