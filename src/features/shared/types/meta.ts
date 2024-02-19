import { z } from 'zod';

import {
  CountryResponseSchema,
  CountrySchema,
  CommentSchema,
} from '../schemas/meta';

export type Country = z.infer<typeof CountrySchema>;

export type CountryResponse = z.infer<
  typeof CountryResponseSchema
>;

export type CommentType = z.infer<typeof CommentSchema>;
