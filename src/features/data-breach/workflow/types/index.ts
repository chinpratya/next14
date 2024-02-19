import { z } from 'zod';

import {
  WorkflowSchema,
  WorkflowResponseSchema,
  WorkflowUserSchema,
  WorkflowUserResponseSchema,
  WorkflowTaskResponseSchema,
  WorkflowTaskSchema,
  WorkflowMetaSchema,
} from '../schemas';

export type Workflow = z.infer<typeof WorkflowSchema>;

export type WorkflowResponse = z.infer<
  typeof WorkflowResponseSchema
>;

export type WorkflowUser = z.infer<
  typeof WorkflowUserSchema
>;

export type WorkflowUserResponse = z.infer<
  typeof WorkflowUserResponseSchema
>;

export type WorkflowTaskResponse = z.infer<
  typeof WorkflowTaskResponseSchema
>;

export type WorkflowTask = z.infer<
  typeof WorkflowTaskSchema
>;

export type WorkflowMeta = z.infer<
  typeof WorkflowMetaSchema
>;
