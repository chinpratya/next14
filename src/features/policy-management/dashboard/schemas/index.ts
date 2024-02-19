import { z } from 'zod';

export const StatusSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const PolicyDashboardSchema = z.object({
  all_policies: z.string(),
  policy_publish: z.string(),
  policy_inprogress: z.string(),
  policy_to_be_reviewed: z.string(),
  policy_overdue: z.string(),
  policy_status: z.array(StatusSchema),
  task_status: z.array(StatusSchema),
  all_tasks: z.string(),
});
