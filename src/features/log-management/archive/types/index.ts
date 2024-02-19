import { z } from 'zod';

import {
  ArchiveResponseSchema,
  ArchiveSchema,
  LogFileSchema,
} from '../schemas';

export type ArchiveResponse = z.infer<
  typeof ArchiveResponseSchema
>;

export type Archive = z.infer<typeof ArchiveSchema>;

export type LogFile = z.infer<typeof LogFileSchema>;
