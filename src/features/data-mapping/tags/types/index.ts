import { z } from 'zod';

import {
  DataMappingTagsSchema,
  DataMappingTagsResponseSchema,
} from '../schemas';

export type DataMappingTags = z.infer<
  typeof DataMappingTagsSchema
>;

export type DataMappingTagsResponse = z.infer<
  typeof DataMappingTagsResponseSchema
>;
