import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const IncidentCategory = z.object({
  objectUuid: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  name: z.string(),
  displayName: z.string(),
  description: z.string(),
  subCategory: z.array(
    z.object({
      objectUuid: z.string().optional(),
      name: z.string().optional(),
      displayName: z.string().optional(),
      description: z.string().optional(),
    })
  ),
});

export const IncidentCategorySchema =
  ResponseSchema.extend({
    data: z.array(IncidentCategory),
  });

export const EngineOperator = z.object({
  objectUuid: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  name: z.string(),
  displayName: z.string(),
  operatorType: z.string(),
  description: z.string(),
  inputType: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

export const EngineOperatorSchema = ResponseSchema.extend(
  {
    data: z.array(EngineOperator),
  }
);

export const RuleDetail = z.object({
  name: z.string(),
  objectUuid: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  category: z.object({
    name: z.string(),
    objectUuid: z.string(),
    displayName: z.string(),
  }),
  operator: z.string(),

  conditions: z.array(
    z.object({
      key: z.string(),
      operatorId: z.string(),
      ruleId: z.string(),
      value: z.string(),
    })
  ),

  action: z.object({
    objectUuid: z.string(),
    workflow: z.string(),
    severity: z.string(),
    sla: z.object({
      name: z.string(),
      objectUuid: z.string(),
      detail: z.string(),
      description: z.string(),
      period: z.object({
        workPeriod: z.object({
          days: z.number(),
          hours: z.number(),
          minutes: z.number(),
        }),
        responsePeriod: z.object({
          days: z.number(),
          hours: z.number(),
          minutes: z.number(),
        }),
      }),
    }),
    isActive: z.boolean(),
  }),
});
