import { z } from 'zod';

import { ResponseSchema } from '@/schema';

import { SlaSchema } from '../../sla';

export const PersonSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
});

export const WorkflowSchema = z.object({
  name: z.string(),
  stakeholders: z.array(PersonSchema),
});

export const WorkflowTaskSchema = z.object({
  object_uuid: z.string(),
  name: z.string(),
});

export const WorkflowResponseSchema =
  ResponseSchema.extend({
    data: WorkflowSchema.extend({
      sla: SlaSchema,
    }),
  });

export const WorkflowTaskListResponseSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowTaskSchema),
  });

export const WorkflowIncidentData = z.object({
  object_uuid: z.string().optional(),
  name: z.string().optional(),
  category: z.string().optional(),
  eventGroup: z.string().optional(),
  subEventGroup: z.string().optional(),
  categoryEvent: z.string().optional(),
  serverity: z.string().optional(),
  isActive: z.boolean().optional(),
  responsiblePerson: z
    .array(z.string().optional())
    .optional(),
  detail: z.string().optional(),
  responsePeriod: z
    .object({
      days: z.number().optional(),
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .optional(),
  workPeriod: z
    .object({
      days: z.number().optional(),
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .optional(),
  description: z.string().optional(),
  serverityDetail: z.string().optional(),
  serviceLevelAgreement_id: z.string().optional(),
  iconUrl: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdDt: z.string().optional(),
  updatedDt: z.string().optional(),
});

export const WorkflowIncidentSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowIncidentData),
  });

export const ServerityList = z.object({
  objectUuid: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  displayName: z.string().optional(),
  value: z.string().optional(),
  order: z.number().optional(),
});

export const ServerityListSchema = ResponseSchema.extend({
  data: z.array(ServerityList),
});
