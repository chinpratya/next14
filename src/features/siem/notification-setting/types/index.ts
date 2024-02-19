import { z } from 'zod';

import {
  notifySchema,
  notifyResponseSchema,
} from '../schemas';

export type Notify = z.infer<typeof notifySchema>;

export type NotifyResponse = z.infer<
  typeof notifyResponseSchema
>;
