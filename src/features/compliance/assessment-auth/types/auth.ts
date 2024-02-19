import { z } from 'zod';

import { RefreshTokenSchema } from '../schemas/auth';

export type RefreshToken = z.infer<
  typeof RefreshTokenSchema
>;
