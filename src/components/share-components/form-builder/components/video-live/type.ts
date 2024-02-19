import { z } from 'zod';

export const VideoSchema = z.object({
  id: z.string(),
  value: z.array(z.string()),
});
export type VideoType = z.infer<typeof VideoSchema>;
