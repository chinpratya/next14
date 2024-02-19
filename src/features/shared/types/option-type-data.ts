import { z } from 'zod';

import {
  OptionTypeDataSchema,
  OptionTypeDataListResponseSchema,
} from '../schemas/option-type-data';

export type OptionTypeData = z.infer<
  typeof OptionTypeDataSchema
>;

export type OptionTypeDataListResponse = z.infer<
  typeof OptionTypeDataListResponseSchema
>;
