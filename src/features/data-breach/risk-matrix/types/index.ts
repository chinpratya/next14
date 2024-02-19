import { z } from 'zod';

import {
  RiskMatrixSchema,
  RiskMatrixResponseSchema,
  RiskMatrixChanceSchema,
  RiskMatrixChanceResponseSchema,
  RiskMatrixEffectSchema,
  RiskMatrixEffectResponseSchema,
  RiskMatrixScorePointSchema,
  RiskMatrixScoreSchema,
  RiskMatrixScoreRiskDetailSchema,
} from '../schemas';

export type RiskMatrix = z.infer<typeof RiskMatrixSchema>;

export type RiskMatrixResponse = z.infer<
  typeof RiskMatrixResponseSchema
>;

export type RiskMatrixChanceType = z.infer<
  typeof RiskMatrixChanceSchema
>;

export type RiskMatrixChangeResponse = z.infer<
  typeof RiskMatrixChanceResponseSchema
>;

export type RiskMatrixEffectType = z.infer<
  typeof RiskMatrixEffectSchema
>;

export type RiskMatrixEffectResponse = z.infer<
  typeof RiskMatrixEffectResponseSchema
>;

export type RiskMatrixScorePoint = z.infer<
  typeof RiskMatrixScorePointSchema
>;

export type RiskMatrixScoreType = z.infer<
  typeof RiskMatrixScoreSchema
>;

export type RiskMatrixScoreRiskDetail = z.infer<
  typeof RiskMatrixScoreRiskDetailSchema
>;
