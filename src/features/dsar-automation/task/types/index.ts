import { z } from 'zod';

import {
  TaskRemindedSchema,
  TaskDetailSchema,
  TaskSchema,
  TaskResponseSchema,
  TaskVersionResponseSchema,
  TaskMetaSchema,
} from '../schemas';

export type TaskReminded = z.infer<
  typeof TaskRemindedSchema
>;

export type TaskDetail = z.infer<typeof TaskDetailSchema>;

export type Task = z.infer<typeof TaskSchema>;

export type TaskResponse = z.infer<
  typeof TaskResponseSchema
>;

export type TaskVersionResponse = z.infer<
  typeof TaskVersionResponseSchema
>;

export type TaskMeta = z.infer<typeof TaskMetaSchema>;
