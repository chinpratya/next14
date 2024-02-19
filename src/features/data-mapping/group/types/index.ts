import { z } from 'zod';

import {
  GroupMetaSchema,
  GroupResponseSchema,
  GroupSchema,
} from '../schemas';

export type Group = z.infer<typeof GroupSchema>;

export type GroupResponse = z.infer<
  typeof GroupResponseSchema
>;

export type GroupMeta = z.infer<typeof GroupMetaSchema>;
