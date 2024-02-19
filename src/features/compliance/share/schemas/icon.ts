import { z } from 'zod';

export const IconSchema = z.object({
  ObjectUUID: z.string(),
  fileID: z.string(),
  fileName: z.string(),
  createdDt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});
