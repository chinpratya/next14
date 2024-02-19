import { z } from 'zod';

import {
  FileSchema,
  PresignedUploadSchema,
} from '../schemas/file-management';

export type File = z.infer<typeof FileSchema>;

export type PresignedUpload = z.infer<
  typeof PresignedUploadSchema
>;
