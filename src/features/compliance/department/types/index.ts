import { z } from 'zod';

import {
  DepartmentSchema,
  DepartmentResponseSchema,
} from '../schemas';

export type Department = z.infer<typeof DepartmentSchema>;

export type DepartmentResponse = z.infer<
  typeof DepartmentResponseSchema
>;
