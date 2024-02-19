import { z } from 'zod';

import {
  RopaSchema,
  RopaResponseSchema,
  RopaDetailSchema,
  RopaDetailResponseSchema,
  RopaExportSchema,
} from '../schemas';

export type Ropa = z.infer<typeof RopaSchema>;

export type RopaExport = z.infer<typeof RopaExportSchema>;

export type RopaResponse = z.infer<
  typeof RopaResponseSchema
>;
export type RopaDetail = z.infer<typeof RopaDetailSchema>;

export type RopaDetailResponse = z.infer<
  typeof RopaDetailResponseSchema
>;
