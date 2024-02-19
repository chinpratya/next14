import { z } from 'zod';

import {
  PolicyDashboardSchema,
  StatusSchema,
} from '../schemas';

export type PolicyDashboard = z.infer<
  typeof PolicyDashboardSchema
>;

export type PolicyDashboardStatus = z.infer<
  typeof StatusSchema
>;
