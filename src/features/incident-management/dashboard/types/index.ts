import { z } from 'zod';

import {
  DashboardCountResponseSchema,
  DashboardByTimeResponseSchema,
  DashboardListOfRequestSchema,
} from '../schemas';

export type DashboardCountResponse = z.infer<
  typeof DashboardCountResponseSchema
>;

export type DashboardByTimeResponse = z.infer<
  typeof DashboardByTimeResponseSchema
>;

export type DashboardListOfRequestResponse = z.infer<
  typeof DashboardListOfRequestSchema
>;
