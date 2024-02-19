import { z } from 'zod';

import {
  InitDataPasswordSchema,
  InitPasswordResponseSchema,
} from '../schemas';

export type InitPassword = z.infer<
  typeof InitDataPasswordSchema
>;

export type InitPasswordResponse = z.infer<
  typeof InitPasswordResponseSchema
>;
