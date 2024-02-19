import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export * from './disclosure';
export * from './basis';
export * from './lawful-basis';
export * from './preview';
export * from './dpia';
export * from './collect';
export * from './consent';
export * from './dsar';

export const ActivitySchema = EntitySchema.extend({
  activityType: z.string(),
  group: z.string(),
  groupID: z.string().optional(),
  status: z.string(),
  owner: z.string(),
  ownerID: z.string().optional(),
  organization: z.string(),
  organizationID: z.string().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
});

export const ActivityResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivitySchema),
  });

export const ActivityActorSchema = EntitySchema.extend({
  ObjectUUID: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  type: z.string(),
  organization: z.string(),
  organizationType: z.string(),
});

export const ActivityDataCategoryClassificationSchema =
  z.object({
    categoryClassificationID: z.string(),
    categoryClassificationName: z.string(),
  });

export const ActivityDataCategoryDataSubjectSchema =
  z.object({
    dataSubjectID: z.string(),
    dataSubjectName: z.string(),
  });

export const ActivityDataCategorySchema =
  EntitySchema.extend({
    categoryID: z.string(),
    activityID: z.string(),
    name: z.string(),
    categoryClassifications: z.array(
      ActivityDataCategoryClassificationSchema
    ),
    organizationID: z.string(),
    organization: z.string(),
    groupID: z.string(),
    groupName: z.string(),
    dataSubjects: z
      .array(ActivityDataCategoryDataSubjectSchema)
      .optional(),
    status: z.string(),
    source: z.array(z.string()).optional(),
    sourceID: z.array(z.string()).optional(),
    tagID: z.array(z.string()).optional(),
    tagName: z.array(z.string()).optional(),
  });

export const ActivityDataCategoryResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDataCategorySchema),
  });

export const ActivityActorResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityActorSchema),
  });

export const ActivityDataProcessorSchema =
  EntitySchema.extend({
    email: z.string(),
    dataProcessorID: z.string(),
    organizationType: z.string(),
    name: z.string(),
    organizationTypeID: z.string(),
    personalTypeID: z.string(),
    organizationName: z.string(),
    positionID: z.string(),
    personalType: z.string(),
    position: z.string(),
  });

export const ActivityDataProcessorResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDataProcessorSchema),
  });
export const ActivityPurposeListSchema = z.record(
  z.string(),
  z.any()
);

export const MetaDataSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const ProtectioninfoDetailSchema = z.object({
  id: z.string(),
  discussion: z.string(),
  identifier: z.string(),
  name: z.string(),
  reference: z.array(z.string()),
});

export const ProtectioninfoSchema =
  ProtectioninfoDetailSchema.extend({
    childs: z.array(ProtectioninfoDetailSchema),
  });
export const ActivityMetaSchema = z.object({
  activityType: z.array(MetaDataSchema),
  legalBasis: z.array(MetaDataSchema),
  rightsOfAccessData: z.array(MetaDataSchema),
  sourceMethod: z.array(MetaDataSchema),
  storageType: z.array(MetaDataSchema),
  tranferData: z.array(MetaDataSchema),
  categorySource: z.array(MetaDataSchema),
  lawPDPA: z.array(MetaDataSchema),
  tranferType: z.array(MetaDataSchema),
  protectioninfo: z.array(ProtectioninfoSchema),
});

export const ActivityDisclosureActorSchema = z.object({
  actorID: z.string(),
  ObjectUUID: z.string(),
  name: z.string(),
  personalType: z.string(),
  actorType: z.string(),
  country: z.string(),
  organization: z.string(),
  organizationType: z.string(),
  purposeID: z.string().optional(),
  purpose: z.string().optional(),
});

export const ActivityDisclosureActorResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityDisclosureActorSchema),
  });

export const ActivityPurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  legalBasis: z.string(),
  group: z.string(),
  lifeCycle: z.array(z.string()),
  organization: z.string().optional(),
  status: z.string().optional(),
  version: z.number().optional(),
});

export const ActivityPurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityPurposeSchema),
  });

export const ActivityUsageSchema = z.object({
  isUsageData: z.boolean(),
});

export const ActivityUsagePurposeSchema = z.object({
  purposeID: z.string(),
  name: z.string(),
  legalBasis: z.string(),
  group: z.string(),
  organization: z.string(),
});

export const ActivityUsagePurposeResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityUsagePurposeSchema),
  });

export const ActivityUsagePeopleSchema = z.object({
  peopleID: z.string(),
  name: z.string(),
  description: z.string(),
  organization: z.string(),
});

export const ActivityUsagePeopleResponseSchema =
  ResponseSchema.extend({
    data: z.array(ActivityUsagePeopleSchema),
  });
