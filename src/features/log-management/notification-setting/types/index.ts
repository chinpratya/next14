import { z } from 'zod';

import {
  NotifyResponseSchema,
  NotifySchema,
} from '../schemas';

export type Notify = z.infer<typeof NotifySchema>;

export type NotifyResponse = z.infer<
  typeof NotifyResponseSchema
>;
