import { z } from 'zod';

import {
  MeasureSchema,
  MeasuresResponseSchema,
  MeasureFormSchema,
} from '../schemas';

export type MeasureType = z.infer<typeof MeasureSchema>;

export type MeasuresResponse = z.infer<
  typeof MeasuresResponseSchema
>;

export type MeasureFormType = z.infer<
  typeof MeasureFormSchema
>;
