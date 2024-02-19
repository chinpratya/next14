import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const TaskProcessStatusSchema = z.enum([
  'open',
  'inprogress',
  'close',
]);

export const TaskListSchema = z.object({
  object_uuid: z.string(),
  status: TaskProcessStatusSchema,
});

export const TaskListResponseSchema =
  ResponseSchema.extend({
    data: z.array(TaskListSchema),
  });
