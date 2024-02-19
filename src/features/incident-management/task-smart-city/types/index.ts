import { z } from 'zod';

import {
  TaskSchema,
  TaskResponseSchema,
  TaskDetailSchema,
  TaskVersionSchema,
  TaskVersionResponseSchema,
  TaskMetaSchema,
  TaskCommentSchema,
  TaskVersionDataSchema,
} from '../schemas';

export type Task = z.infer<typeof TaskSchema>;

export type TaskVersionData = z.infer<
  typeof TaskVersionDataSchema
>;

export type TaskResponse = z.infer<
  typeof TaskResponseSchema
>;

export type TaskDetail = z.infer<typeof TaskDetailSchema>;

export type TaskVersion = z.infer<
  typeof TaskVersionSchema
>;

export type TaskVersionResponse = z.infer<
  typeof TaskVersionResponseSchema
>;

export type TaskMeta = z.infer<typeof TaskMetaSchema>;

export type TaskComment = z.infer<
  typeof TaskCommentSchema
>;
