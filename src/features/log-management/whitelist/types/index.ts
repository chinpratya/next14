import { z } from 'zod';

import {
  WhitelistResponseSchema,
  WhitelistSchema,
} from '../schemas';

export type Whitelist = z.infer<typeof WhitelistSchema>;

export type WhitelistResponse = z.infer<
  typeof WhitelistResponseSchema
>;
