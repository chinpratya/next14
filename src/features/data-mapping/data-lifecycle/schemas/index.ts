import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const DataLifecycleSchema = EntitySchema.extend({
  dataLifeCycleID: z.string(),
  activityID: z.string(),
  name: z.string(),
  actorType: z.string(),
  group: z.string(),
  status: z.string(),
  owner: z.string(),
  organization: z.string(),
});

export const DataLifecycleResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataLifecycleSchema),
  });

export const DataLifecycleFlowItemSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  refObjectUUID: z.array(z.string()),
});

export const DataLifecycleFlowSchema = z.record(
  z.string(),
  z.array(DataLifecycleFlowItemSchema)
);

export const DataLifecycleCollectSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.string(),
  country: z.string(),
  address: z.string(),
  owner: z.string(),
  dataset: z.string().optional(),
});

export const DataLifecycleDatasetSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.string(),
  categoryClassification: z.array(z.string()),
  dataElements: z.array(
    z.object({
      dataElementID: z.string(),
      name: z.string(),
      classification: z.string(),
    })
  ),
});

export const DataLifecycleStorageSchema =
  DataLifecycleCollectSchema;

export const DataLifecycleRightsSchema = z.object({
  ObjectUUID: z.string(),
  description: z.string(),
});

export const DataLifecycleProcessSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.string(),
  legalBasis: z.string(),
  isDataUsagePeriod: z.string(),
  dataUsagePeriod: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
    description: z.string(),
  }),
  tranferType: z.array(z.string()),
});

export const DataLifecycleTransferSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.string(),
  country: z.string(),
  address: z.string(),
  owner: z.string(),
  dataset: z.string().optional(),
  personalType: z.string(),
  actorType: z.string(),
  organization: z.string(),
  organizationType: z.string(),
  email: z.string(),
  phone: z.string(),
  url: z.string(),
});

export const DataLifecycleDataDestructionSchema =
  z.object({
    ObjectUUID: z.string(),
    description: z.string(),
  });

export const DataLifecycleDataSchema = z.object({
  collect: z.array(DataLifecycleCollectSchema),
  dataset: z.array(DataLifecycleDatasetSchema),
  rights: z.array(DataLifecycleRightsSchema),
  storage: z.array(DataLifecycleStorageSchema),
  process: z.array(DataLifecycleProcessSchema),
  tranfer: z.array(DataLifecycleTransferSchema),
  dataDestruction: z.array(
    DataLifecycleDataDestructionSchema
  ),
});
