import { z } from 'zod';

export const RightsStageSchema = z.object({
  stageID: z.string().optional(),
  stateID: z.string().optional(),
  name: z.string().optional(),
  stageName: z.string().optional(),
  order: z.number(),
  set_start_time: z.boolean(),
  auto_complete: z.boolean(),
  sent_email_if_start: z.boolean(),
  sent_email_if_complete: z.boolean(),
});
