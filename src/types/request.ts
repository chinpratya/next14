import { z } from 'zod';

import { RequestSchema } from '@/schema';

export type RequestStandard = z.infer<
  typeof RequestSchema
>;

export type Request = RequestStandard &
  Record<string, unknown>;
