import { z } from 'zod';

import {
  SlaListResponseSchema,
  SlaSchema,
  SlaDataSchema,
  SlaDetaSchema,
  SlaDataWithSeveritySchema,
} from '../schemas';

export type Sla = z.infer<typeof SlaSchema>;
export type SlaData = z.infer<typeof SlaDataSchema>;

export type SlaListResponse = z.infer<
  typeof SlaListResponseSchema
>;

export type SlaDataDetailResponse = z.infer<
  typeof SlaDetaSchema
>;

export type SlaDataDetailWithSevirityResponse = z.infer<
  typeof SlaDataWithSeveritySchema
>;
