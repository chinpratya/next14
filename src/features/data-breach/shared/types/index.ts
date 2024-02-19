import { z } from 'zod';

import {
  RightsStageSchema,
  RiskLikelihoodSchema,
  RiskEffectSchema,
  RiskScorePointSchema,
  RiskAssessmentDetailSchema,
} from '../schemas';

export type RightsStageType = z.infer<
  typeof RightsStageSchema
>;

export type RiskLikelihoodType = z.infer<
  typeof RiskLikelihoodSchema
>;

export type RiskEffectType = z.infer<
  typeof RiskEffectSchema
>;

export type RiskScorePoint = z.infer<
  typeof RiskScorePointSchema
>;

export type RiskAssessmentDetailType = z.infer<
  typeof RiskAssessmentDetailSchema
>;
