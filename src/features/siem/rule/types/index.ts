import { z } from 'zod';

import {
  RuleSchema,
  RuleInfoSchema,
  RuleResponseSchema,
  FieldSchema,
  AliasIndiceSchema,
} from '../schemas';

export type Rule = z.infer<typeof RuleSchema>;

export type RuleInfo = z.infer<typeof RuleInfoSchema>;

export type Field = z.infer<typeof FieldSchema>;

export type AliasIndice = z.infer<
  typeof AliasIndiceSchema
>;

export type RuleResponse = z.infer<
  typeof RuleResponseSchema
>;

export type ListField = {
  data?: { value: string; label: string }[];
  isLoading: boolean;
  isError: boolean;
};

export type FilterFormValue = {
  field: string;
  condition: string;
  value: string | string[];
};

export type FilterDetail = {
  field: string;
  condition: string;
  value: string | string[];
};

export type Filter = {
  match_phrase?: {
    [key: string]: {
      query: string;
    };
  };
  exists?: {
    field: string;
  };
  bool?: {
    minimum_should_match: number;
    should: {
      match_phrase: {
        [x: string]: string;
      };
    }[];
  };
};
