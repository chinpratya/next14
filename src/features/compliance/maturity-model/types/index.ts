import { z } from 'zod';

import {
  MaturityModelSchema,
  MaturityModelDetailSchema,
  ListMaturityModelSchema,
} from '../schemas';

export type MaturityModel = z.infer<
  typeof MaturityModelSchema
>;

export type MaturityModelDetail = z.infer<
  typeof MaturityModelDetailSchema
>;

export type ListMaturityModel = z.infer<
  typeof ListMaturityModelSchema
>;
