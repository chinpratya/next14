import { z } from 'zod';

import {
  DashboardResponseSchema,
  AssessmentSubmissionSchema,
  DashboardMetaResponseSchema,
  OptionsSchema,
} from '../schemas/dashboard';

export type DashboardResponse = z.infer<
  typeof DashboardResponseSchema
>;

export type DashboardMetaResponse = z.infer<
  typeof DashboardMetaResponseSchema
>;
export type AssessmentSubmission = z.infer<
  typeof AssessmentSubmissionSchema
>;

export type OptionsDashboard = z.infer<
  typeof OptionsSchema
>;
