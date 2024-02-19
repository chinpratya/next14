import { z } from 'zod';

import {
  ConsentCollectionPointSchema,
  ConsentCollectionPointResponseSchema,
  ConsentCollectionPointDetailSchema,
  ConsentCollectionPointMetaSchema,
  ConsentCollectionPointElementSchema,
  ConsentCollectionPointPrivacyNoticeSchema,
  ConsentCollectionPointHistorySchema,
  ConsentCollectionPointHistoryResponseSchema,
  ConsentCollectionPointPolicyMetaSchema,
  ConsentCollectionPointLanguageSchema,
  ConsentCollectionPointLanguageDetailSchema,
} from '../schemas';

export type ConsentCollectionPoint = z.infer<
  typeof ConsentCollectionPointSchema
>;

export type ConsentCollectionPointResponse = z.infer<
  typeof ConsentCollectionPointResponseSchema
>;

export type ConsentCollectionPointDetail = z.infer<
  typeof ConsentCollectionPointDetailSchema
>;

export type ConsentCollectionPointMeta = z.infer<
  typeof ConsentCollectionPointMetaSchema
>;

export type ConsentCollectionPointElement = z.infer<
  typeof ConsentCollectionPointElementSchema
>;

export type ConsentCollectionPointPrivacyNotice = z.infer<
  typeof ConsentCollectionPointPrivacyNoticeSchema
>;

export type ConsentCollectionPointHistory = z.infer<
  typeof ConsentCollectionPointHistorySchema
>;

export type ConsentCollectionPointHistoryResponse =
  z.infer<
    typeof ConsentCollectionPointHistoryResponseSchema
  >;

export type ConsentCollectionPointPolicyMeta = z.infer<
  typeof ConsentCollectionPointPolicyMetaSchema
>;

export type ConsentCollectionPointLanguage = z.infer<
  typeof ConsentCollectionPointLanguageSchema
>;

export type ConsentCollectionPointLanguageDetail =
  z.infer<
    typeof ConsentCollectionPointLanguageDetailSchema
  >;
