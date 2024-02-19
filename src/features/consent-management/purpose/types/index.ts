import { z } from 'zod';

import {
  ConsentPurposeSchema,
  ConsentPurposeResponseSchema,
  GroupsSchema,
  ConsentPurposeDetailSchema,
  ConsentPurposeVersionSchema,
  ConsentPurposeMetaSchema,
  PreferenceTypeSchema,
  DisplayTypeSchema,
  PreferencesSchema,
} from '../schemas';

export type ConsentPurpose = z.infer<
  typeof ConsentPurposeSchema
>;

export type ConsentPurposeResponse = z.infer<
  typeof ConsentPurposeResponseSchema
>;
export type GroupPurpose = z.infer<typeof GroupsSchema>;

export type ConsentPurposeDetail = z.infer<
  typeof ConsentPurposeDetailSchema
>;

export type ConsentPurposeVersion = z.infer<
  typeof ConsentPurposeVersionSchema
>;

export type ConsentPurposeMeta = z.infer<
  typeof ConsentPurposeMetaSchema
>;

export type PerferenceType = z.infer<
  typeof PreferenceTypeSchema
>;

export type DisplayType = z.infer<
  typeof DisplayTypeSchema
>;

export type Preference = z.infer<
  typeof PreferencesSchema
>;
