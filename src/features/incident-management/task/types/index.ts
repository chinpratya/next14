import { z } from 'zod';

import {
  TaskListResponseSchema,
  TaskListSchema,
} from '../schemas';

export type TaskListProps = z.infer<
  typeof TaskListSchema
>;

export type TaskListResponse = z.infer<
  typeof TaskListResponseSchema
>;
