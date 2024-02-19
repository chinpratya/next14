import { z } from 'zod';

import {
  ActivityPreviewSchema,
  DataCategoriesItemSchema,
  PurposesItemSchema,
  TransferDataItemSchema,
  PurposeItemSchema,
  SecurityMeasuresItemSchema,
  RightsOfPersonalItemSchema,
} from '../schemas';

export type ActivityPreview = z.infer<
  typeof ActivityPreviewSchema
>;

export type DataCategories = z.infer<
  typeof DataCategoriesItemSchema
>;

export type Purposes = z.infer<typeof PurposesItemSchema>;

export type TransferData = z.infer<
  typeof TransferDataItemSchema
>;

export type PrivacyPolicyPurpose = z.infer<
  typeof PurposeItemSchema
>;

export type PrivacyPolicySecurityMeasures = z.infer<
  typeof SecurityMeasuresItemSchema
>;

export type PrivacyPolicyRightsOfPersonal = z.infer<
  typeof RightsOfPersonalItemSchema
>;
