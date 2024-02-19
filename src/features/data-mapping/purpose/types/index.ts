import { z } from 'zod';

import {
  PurposeSchema,
  PurposeResponseSchema,
  PurposeHistorySchema,
  PurposeHistoryResponseSchema,
  PurposeUpdateResponseSchema,
} from '../schemas';

export type Purpose = z.infer<typeof PurposeSchema>;

export type PurposeHistory = z.infer<
  typeof PurposeHistorySchema
>;

export type PurposeResponse = z.infer<
  typeof PurposeResponseSchema
>;

export type PurposeHistoryResponse = z.infer<
  typeof PurposeHistoryResponseSchema
>;

export type PurposeUpdateResponse = z.infer<
  typeof PurposeUpdateResponseSchema
>;
