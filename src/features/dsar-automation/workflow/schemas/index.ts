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
  endDate: z.number(),
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
  isReject: z.boolean().optional(),
  rejectMassage: z.string().optional(),
  isMailRelated: z.boolean().optional(),
  mailRelated: z.array(z.string()).optional(),
  reminded: z
    .array(
      z.object({
        type: z.string(),
        time: z.number(),
        responsible: z.array(z.string()),
      })
    )
    .optional(),
});

export const WorkflowTaskResponseSchema =
  ResponseSchema.extend({
    data: z.array(WorkflowTaskSchema),
  });

export const prioritySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const WorkflowMetaSchema = z.object({
  priority: z.array(prioritySchema),
  stages_init: z.array(
    z.object({
      allow_editable_data: z.boolean(),
      request_data_editable: z.boolean(),
      auto_calculated_deadline: z.boolean(),
      auto_advance: z.boolean(),
      name: z.string(),
      allow_editable_deadline: z.boolean(),
      sent_email_if_complate: z.boolean(),
      order: z.number(),
    })
  ),
});
