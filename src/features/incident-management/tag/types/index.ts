import { z } from 'zod';

import {
  TagSchemaIncident,
  TagResponseSchema,
} from '../schemas';

export type Tag = z.infer<typeof TagSchemaIncident>;

export type TagResponse = z.infer<
  typeof TagResponseSchema
>;
