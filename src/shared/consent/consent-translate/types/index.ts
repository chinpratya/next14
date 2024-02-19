import { z } from 'zod';

import {
  MetaTypeSchema,
  WebFormMetaSchema,
} from '../schemas';

export type MetaType = z.infer<typeof MetaTypeSchema>;

export type WebFormMeta = z.infer<
  typeof WebFormMetaSchema
>;
