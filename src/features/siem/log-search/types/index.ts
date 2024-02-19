import { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
  LogSearchHostSchema,
  LogSearchIndiceSchema,
  LogSearchHostResponseSchema,
  LogSearchIndiceResponseSchema,
  LogSearchPayloadSchema,
  LogSearchResponseSchema,
  LogSearchSchema,
  FieldSchema,
} from '../schemas';

export type LogSearchHost = z.infer<
  typeof LogSearchHostSchema
>;

export type LogSearchIndice = z.infer<
  typeof LogSearchIndiceSchema
>;

export type LogSearchHostResponse = z.infer<
  typeof LogSearchHostResponseSchema
>;

export type LogSearchIndiceResponse = z.infer<
  typeof LogSearchIndiceResponseSchema
>;

export type LogSearchPayload = z.infer<
  typeof LogSearchPayloadSchema
> & {
  timestamp: {
    from: Dayjs;
    to: Dayjs;
  };
};

export type LogSearch = z.infer<typeof LogSearchSchema>;

export type LogSearchResponse = z.infer<
  typeof LogSearchResponseSchema
>;

export type FieldData = {
  allField: {
    label: string;
    value: string;
  }[];
  searchResult: {
    label: string;
    value: string;
  }[];
  selectedField: string[];
  search: string;
  allChecked: boolean;
};

export type SearchField = z.infer<typeof FieldSchema>;
