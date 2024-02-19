import { z } from 'zod';

import { TimezoneResponseSchema } from '../schemas/timezone';

export type TimezoneResponse = z.infer<
  typeof TimezoneResponseSchema
>;
