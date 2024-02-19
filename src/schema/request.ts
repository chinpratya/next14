import { z } from 'zod';

export const RequestSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sort: z.string().optional(),
  filter: z.string().optional(),
  search: z.string().optional(),
});
