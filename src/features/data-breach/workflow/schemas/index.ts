import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const WorkflowSchema = EntitySchema.extend({
  workflowID: z.string(),
  name: z.string(),
  status: z.string(),
  description: z.string().optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
});

export const WorkflowResponseSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowSchema),
  });

export const WorkflowUserSchema = EntitySchema.extend({
  userID: z.string(),
  name: z.string(),
  position: z.string(),
  organization: z.array(z.string()),
});

export const WorkflowUserResponseSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowUserSchema),
  });

export const WorkflowTaskSchema = EntitySchema.extend({
  taskID: z.string(),
  name: z.string(),
  description: z.string().optional(),
  priority: z.string(),
  endDate: z.object({
    value: z.number(),
    type: z.string(),
  }),
  delegateID: z.array(z.string()).optional(),
  delegateName: z.array(z.string()).optional(),
  isAPI: z.boolean().optional().nullable(),
  apiURL: z.string().optional().nullable(),
  IdentifyTask: z.boolean().optional(),
  requiredJob: z.boolean().optional(),
  resolutionCloseJob: z.boolean().optional(),
  resolutionEndJob: z.boolean().optional(),
  isCloseIfReject: z.boolean().optional(),
  isSetNotificationTime: z.boolean().optional(),
  reminded: z
    .array(
      z.object({
        type: z.string(),
        time: z.object({
          value: z.number(),
          type: z.string(),
        }),
        responsible: z.array(z.string()),
      })
    )
    .optional(),
});

export const WorkflowTaskResponseSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowTaskSchema),
  });

export const WorkflowPrioritySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const WorkflowMetaSchema = z.object({
  priority: z.array(WorkflowPrioritySchema),
  stages_init: z.array(
    z.object({
      set_start_time: z.boolean(),
      auto_complete: z.boolean(),
      sent_email_if_start: z.boolean(),
      sent_email_if_complete: z.boolean(),
      order: z.number(),
    })
  ),
  time_type: z.array(
    z.object({
      ObjectUUID: z.string(),
      step: z.number(),
      name: z.string(),
    })
  ),
});
