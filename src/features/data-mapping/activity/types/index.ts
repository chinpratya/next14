import { z } from 'zod';

import {
  ActivitySchema,
  ActivityResponseSchema,
  ActivityActorSchema,
  ActivityActorResponseSchema,
  ActivityDataCategoryClassificationSchema,
  ActivityDataCategoryDataSubjectSchema,
  ActivityDataCategorySchema,
  ActivityDataCategoryResponseSchema,
  ActivityMetaSchema,
  ActivityDisclosureActorSchema,
  ActivityDisclosureActorResponseSchema,
  ActivityPurposeResponseSchema,
  ActivityPurposeSchema,
  ActivityUsageSchema,
  ActivityUsagePurposeResponseSchema,
  ActivityUsagePurposeSchema,
  ActivityUsagePeopleResponseSchema,
  ActivityUsagePeopleSchema,
  ActivityDataProcessorResponseSchema,
  ActivityDataProcessorSchema,
} from '../schemas';

export * from './disclosure';
export * from './basis';
export * from './lawful-basis';
export * from './preview';
export * from './dpia';
export * from './collect';
export * from './consent';
export * from './dsar';

export type Activity = z.infer<typeof ActivitySchema>;

export type ActivityResponse = z.infer<
  typeof ActivityResponseSchema
>;

export type ActivityActor = z.infer<
  typeof ActivityActorSchema
>;

export type ActivityActorResponse = z.infer<
  typeof ActivityActorResponseSchema
>;

export type ActivityDataCategoryClassification = z.infer<
  typeof ActivityDataCategoryClassificationSchema
>;

export type ActivityDataCategoryDataSubject = z.infer<
  typeof ActivityDataCategoryDataSubjectSchema
>;

export type ActivityDataCategory = z.infer<
  typeof ActivityDataCategorySchema
>;

export type ActivityDataCategoryResponse = z.infer<
  typeof ActivityDataCategoryResponseSchema
>;

export type ActivityPurposeList = z.infer<
  typeof ActivityPurposeSchema
>;

export type ActivityRelatedPerson = z.infer<
  typeof ActivityUsagePeopleSchema
>;

export type ActivityMeta = z.infer<
  typeof ActivityMetaSchema
>;

export type ActivityDisclosureActor = z.infer<
  typeof ActivityDisclosureActorSchema
>;

export type ActivityDisclosureActorResponse = z.infer<
  typeof ActivityDisclosureActorResponseSchema
>;

export type ActivityPurposeResponse = z.infer<
  typeof ActivityPurposeResponseSchema
>;

export type ActivityUsage = z.infer<
  typeof ActivityUsageSchema
>;

export type ActivityUsagePurposeResponse = z.infer<
  typeof ActivityUsagePurposeResponseSchema
>;

export type ActivityUsagePurpose = z.infer<
  typeof ActivityUsagePurposeSchema
>;

export type ActivityUsagePeopleResponse = z.infer<
  typeof ActivityUsagePeopleResponseSchema
>;

export type ActivityDataProcessorResponse = z.infer<
  typeof ActivityDataProcessorResponseSchema
>;

export type ActivityDataProcessor = z.infer<
  typeof ActivityDataProcessorSchema
>;
