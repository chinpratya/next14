import { z } from 'zod';

import {
  DirectorySchema,
  DirectoryResponseSchema,
  ArchiveSchema,
  DirectoryLevelSchema,
  ExplorerDownloadSchema,
} from '../schemas';

export type Directory = z.infer<typeof DirectorySchema>;

export type Archive = z.infer<typeof ArchiveSchema>;

export type DirectoryLevel = z.infer<
  typeof DirectoryLevelSchema
>;

export type DirectoryResponse = z.infer<
  typeof DirectoryResponseSchema
>;

export type ExplorerDownload = z.infer<
  typeof ExplorerDownloadSchema
>;
