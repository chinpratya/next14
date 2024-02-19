import { z } from 'zod';

import {
  DataElementMetaSchema,
  DataElementResponseSchema,
  DataElementSchema,
} from '../schemas';

export type DataElement = z.infer<
  typeof DataElementSchema
>;

export type DataElementResponse = z.infer<
  typeof DataElementResponseSchema
>;

export type DataElementMeta = z.infer<
  typeof DataElementMetaSchema
>;
