import { z } from 'zod';

import {
  AgenciesSchema,
  AgenciesResponseSchema,
} from '../schemas';

export type Agencies = z.infer<typeof AgenciesSchema>;

export type AgenciesResponse = z.infer<
  typeof AgenciesResponseSchema
>;
