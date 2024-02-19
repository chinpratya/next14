import { z } from 'zod';

import {
  BackupDataResponseSchema,
  BackupDataSchema,
  BackupDataInfoSchema,
  BackupDataActivityResponseSchema,
  BackupDataActivitySchema,
} from '../schemas';

export type BackupData = z.infer<typeof BackupDataSchema>;

export type BackupDataResponse = z.infer<
  typeof BackupDataResponseSchema
>;

export type BackupDataInfo = z.infer<
  typeof BackupDataInfoSchema
>;

export type BackupDataActivity = z.infer<
  typeof BackupDataActivitySchema
>;

export type BackupDataActivityResponse = z.infer<
  typeof BackupDataActivityResponseSchema
>;
