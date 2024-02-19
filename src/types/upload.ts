import { z } from 'zod';

import {
  UploadPresignedFieldsSchema,
  UploadPresignedSchema,
} from '@/schema';

export type UploadPresignedFields = z.infer<
  typeof UploadPresignedFieldsSchema
>;

export type UploadPresigned = z.infer<
  typeof UploadPresignedSchema
>;
