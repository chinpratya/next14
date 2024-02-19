import { z } from 'zod';

import {
  ActivityPurposeSchema,
  ActivityPurposeResponseSchema,
  ActivityPreviewSchema,
  ActivityPurposeDetailSchema,
} from '../schemas';

export type ActivityPurpose = z.infer<
  typeof ActivityPurposeSchema
>;

export type ActivityPurposeResponse = z.infer<
  typeof ActivityPurposeResponseSchema
>;

export type ConsentActivityPreview = z.infer<
  typeof ActivityPreviewSchema
>;

export type ActivityPurposeDetail = z.infer<
  typeof ActivityPurposeDetailSchema
>;
