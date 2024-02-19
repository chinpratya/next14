import { z } from 'zod';

import {
  WorkflowTaskListResponseSchema,
  WorkflowTaskSchema,
  WorkflowIncidentSchema,
  WorkflowResponseSchema,
  WorkflowSchema,
  WorkflowIncidentData,
  ServerityListSchema,
} from '../schemas';

export type Workflow = z.infer<typeof WorkflowSchema>;
export type WorkflowTask = z.infer<
  typeof WorkflowTaskSchema
>;

export type WorkflowResponse = z.infer<
  typeof WorkflowResponseSchema
>;

export type WorkflowTaskListResponse = z.infer<
  typeof WorkflowTaskListResponseSchema
>;

export type WorkflowIncident = z.infer<
  typeof WorkflowIncidentSchema
>;

export type WorkflowIncidentDatas = z.infer<
  typeof WorkflowIncidentData
>;

export type ServerityListDatas = z.infer<
  typeof ServerityListSchema
>;
