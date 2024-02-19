import { z } from 'zod';

import {
  ResendEmailVerifySchema,
  ResendEmailVerifyResponseSchema,
} from '../schemas';

export type ResendEmailVerify = z.infer<
  typeof ResendEmailVerifySchema
>;

export type ResendEmailVerifyResponse = z.infer<
  typeof ResendEmailVerifyResponseSchema
>;
