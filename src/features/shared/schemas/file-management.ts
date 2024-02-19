import { z } from 'zod';

export const FileSchema = z.object({
  key: z.string(),
  file_name: z.string().optional(),
  module: z.string().optional(),
  group: z.string().optional(),
  url: z.string(),
  size: z.number(),
  last_modified: z.string(),
  owner: z.string(),
  storage_class: z.string(),
});

export const PresignedUploadFieldsSchema = z.object({
  'Content-Type': z.string(),
  key: z.string(),
  AWSAccessKeyId: z.string(),
  'x-amz-security-token': z.string(),
  policy: z.string(),
  signature: z.string(),
});

export const PresignedUploadSchema = z.object({
  key: z.string(),
  module: z.string(),
  group: z.string(),
  file_name: z.string(),
  url_expires_in: z.number(),
  url: z.string(),
  fields: PresignedUploadFieldsSchema,
});
