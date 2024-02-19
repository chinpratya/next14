import { z } from 'zod';

import { TagSchema, TagResponseSchema } from '../schemas';

export type Tag = z.infer<typeof TagSchema>;

export type TagResponse = z.infer<
  typeof TagResponseSchema
>;
