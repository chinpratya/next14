import { z } from 'zod';

import {
  PositionSchema,
  PositionResponseSchema,
} from '../schemas';

export type Position = z.infer<typeof PositionSchema>;

export type PositionResponse = z.infer<
  typeof PositionResponseSchema
>;
