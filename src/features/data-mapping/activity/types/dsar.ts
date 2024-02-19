import { z } from 'zod';

import {
  ActivityDsarSchema,
  ActivityDsarResponseSchema,
} from '../schemas/dsar';

export type ActivityDsar = z.infer<
  typeof ActivityDsarSchema
>;

export type ActivityDsarResponse = z.infer<
  typeof ActivityDsarResponseSchema
>;
