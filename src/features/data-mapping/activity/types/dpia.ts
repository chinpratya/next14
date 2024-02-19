import { z } from 'zod';

import {
  ActivityDpiaSchema,
  ActivityDpiaInitSchema,
} from '../schemas';

export type ActivityDpia = z.infer<
  typeof ActivityDpiaSchema
>;

export type ActivityDpiaInit = z.infer<
  typeof ActivityDpiaInitSchema
>;
