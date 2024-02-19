import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const RuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()).nullable(),
  type: z.string(),
  components: z.array(
    z.object({
      indices: z.string(),
      query: z.string().optional(),
      filters: z
        .object({
          bool: z
            .object({
              filter: z
                .array(z.any())
                .nullable()
                .optional(),
              must: z
                .array(
                  z.object({
                    match_phrase: z.any().optional(),
                    bool: z
                      .object({
                        minimum_should_match: z.number(),
                        should: z.array(
                          z.object({
                            match_phrase: z.any(),
                          })
                        ),
                      })
                      .optional(),
                    exists: z
                      .object({
                        field: z.string(),
                      })
                      .optional(),
                  })
                )
                .nullable()
                .optional(),
              must_not: z
                .array(
                  z.object({
                    match_phrase: z.any().optional(),
                    exists: z
                      .object({
                        field: z.string(),
                      })
                      .optional(),
                    bool: z
                      .object({
                        minimum_should_match: z.number(),
                        should: z.array(
                          z.object({
                            match_phrase: z.any(),
                          })
                        ),
                      })
                      .optional(),
                  })
                )
                .nullable()
                .optional(),
              should: z
                .array(z.any({}))
                .nullable()
                .optional(),
            })
            .optional(),
        })
        .optional(),
      group_by: z.array(z.string()).nullable().optional(),
      selected: z
        .object({
          all: z.boolean(),
        })
        .optional(),
      trigger: z.object({
        aggregate: z.object({
          type: z.string().optional(),
          field: z.string().optional(),
        }),
        every: z.object({
          value: z.number(),
          unit: z.string(),
        }),
        thresholds: z.object({
          operator: z.string(),
          severity: z
            .array(
              z.object({
                value: z.number(),
                type: z.string(),
              })
            )
            .nullable(),
        }),
      }),
    })
  ),
  notify: z.object({
    message: z.string(),
  }),
  enabled: z.boolean(),
  status: z.string(),
  created_date: z.string(),
  updated_date: z.string(),
});

export const RuleInfoSchema = RuleSchema.extend({
  organization: z.string(),
  notify: z.object({
    recipients: z.array(z.string()),
    message: z.string(),
    suppress_minute: z.number(),
  }),
  is_protected: z.boolean(),
  tenancy_block: z.array(z.object({})),
  created_by: z.string(),
  created_date: z.string(),
});

export const RuleResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(RuleSchema),
  });

export const FieldSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FieldSchemaResponse = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  })
);

export const AliasIndiceSchema = z.object({
  label: z.string(),
  value: z.string(),
  type: z.string().optional(),
});
