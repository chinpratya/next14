import { z } from 'zod';

import {
  ActivityCollectPurposeSchema,
  ActivityCollectDataRetentionSchema,
  ActivityCollectDataRetentionResponseSchema,
  ActivityCollectSchema,
  ActivityCollectPurposeResponseSchema,
  ActivityCollectChannelResponseSchema,
  ActivityCollectChannelSchema,
  ActivityCollectOfActivityAccessResponseSchema,
  ActivityCollectOfActivityAccessSchema,
  ActivityCollectMetaSchema,
  ActivityCollectOfActivityAccessDetailSchema,
} from '../schemas';

export type ActivityCollectOfActivityAccessDetail =
  z.infer<
    typeof ActivityCollectOfActivityAccessDetailSchema
  >;

export type ActivityCollectMeta = z.infer<
  typeof ActivityCollectMetaSchema
>;

export type ActivityCollectOfActivityAccess = z.infer<
  typeof ActivityCollectOfActivityAccessSchema
>;

export type ActivityCollectOfActivityAccessResponse =
  z.infer<
    typeof ActivityCollectOfActivityAccessResponseSchema
  >;

export type ActivityPurposeCollect = z.infer<
  typeof ActivityCollectPurposeSchema
>;

export type ActivityCollectImportChannel = z.infer<
  typeof ActivityCollectChannelSchema
>;

export type ActivityCollectDataRetention = z.infer<
  typeof ActivityCollectDataRetentionSchema
>;

export type ActivityCollectDataRetentionResponse =
  z.infer<
    typeof ActivityCollectDataRetentionResponseSchema
  >;

export type ActivityCollect = z.infer<
  typeof ActivityCollectSchema
>;

export type ActivityCollectPurposeResponse = z.infer<
  typeof ActivityCollectPurposeResponseSchema
>;

export type ActivityCollectChannelResponse = z.infer<
  typeof ActivityCollectChannelResponseSchema
>;
