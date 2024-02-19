import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TaskSchema = z.object({
  workID: z.string(),
  isrequest: z.boolean().optional(),
  workName: z.string(),
  workflowname: z.string(),
  stage: z.string(),
  approve: z.string(),
  status: z.string(),
  deadlineDt: z.string(),
  createDt: z.string(),
});

export const TaskResponseSchema = ResponseSchema.extend({
  data: z.array(TaskSchema),
});

export const TaskDetailSchema = z.object({
  workName: z.string(),
  approveID: z.string(),
  approve: z.string(),
  description: z.string(),
  deadlineDt: z.string(),
  remindDt: z.string(),
  isRequired: z.boolean(),
  isComment: z.boolean(),
  isResolution: z.boolean(),
  requestID: z.string(),
  email: z.string(),
  typeRequest: z.string(),
  labels: z.string(),
  reminded: z
    .array(
      z.object({
        type: z.string(),
        time: z.number(),
        responsible: z.array(z.string()),
      })
    )
    .optional(),
  isSetNotificationTime: z.boolean().optional(),
  endDate: z.number().optional(),
  status: z.string(),
});

export const TaskVersionSchema = z.object({
  updateBy: z.string(),
  updateDt: z.string(),
  FieldName: z.string(),
  oldVersion: z.string(),
  newVersion: z.string(),
});

export const TaskVersionDataSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
  requestID: z.string().optional(),
  time: z.string(),
  oldLang: z.string().optional(),
  newLang: z.string().optional(),
  oldTime: z.string().optional(),
  newTime: z.string().optional(),
  oldApproved: z.string().optional(),
  newApproved: z.string().optional(),
  oldStatus: z.string().optional(),
  newStatus: z.string().optional(),
  oldstate: z.string().optional(),
  newstate: z.string().optional(),
});
export const TaskVersionResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      z.object({
        type: z.string(),
        data: TaskVersionDataSchema,
      })
    ),
  });

export const MetaSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const TaskMetaSchema = z.object({
  status: z.array(MetaSchema),
  solution: z.array(MetaSchema),
});

export const TaskCommentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  commentDt: z.string(),
  comment: z.string(),
});
