import { z } from 'zod';

import {
  DataLifecycleSchema,
  DataLifecycleResponseSchema,
  DataLifecycleFlowItemSchema,
  DataLifecycleFlowSchema,
  DataLifecycleCollectSchema,
  DataLifecycleDatasetSchema,
  DataLifecycleStorageSchema,
  DataLifecycleRightsSchema,
  DataLifecycleProcessSchema,
  DataLifecycleTransferSchema,
  DataLifecycleDataDestructionSchema,
  DataLifecycleDataSchema,
} from '../schemas';

export type DataLifecycle = z.infer<
  typeof DataLifecycleSchema
>;

export type DataLifecycleResponse = z.infer<
  typeof DataLifecycleResponseSchema
>;

export type DataLifecycleFlowItem = z.infer<
  typeof DataLifecycleFlowItemSchema
>;

export type DataLifecycleFlowType = z.infer<
  typeof DataLifecycleFlowSchema
>;

export type DataLifecycleFlowNodeType =
  DataLifecycleFlowItem & {
    label: string;
    column: keyof DataLifecycleFlowType;
  };

export type DataLifecycleCollect = z.infer<
  typeof DataLifecycleCollectSchema
>;

export type DataLifecycleDataset = z.infer<
  typeof DataLifecycleDatasetSchema
>;

export type DataLifecycleStorage = z.infer<
  typeof DataLifecycleStorageSchema
>;

export type DataLifecycleRights = z.infer<
  typeof DataLifecycleRightsSchema
>;

export type DataLifecycleProcess = z.infer<
  typeof DataLifecycleProcessSchema
>;

export type DataLifecycleTransfer = z.infer<
  typeof DataLifecycleTransferSchema
>;

export type DataLifecycleDataDestruction = z.infer<
  typeof DataLifecycleDataDestructionSchema
>;

export type DataLifecycleData = z.infer<
  typeof DataLifecycleDataSchema
>;
