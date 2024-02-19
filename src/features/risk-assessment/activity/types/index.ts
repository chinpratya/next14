import { z } from 'zod';

import {
  ActivitySchema,
  ActivityResponseSchema,
  ActivityOfAssessmentSchema,
  ActivityOfAssessmentResponseSchema,
  ActivityOfAssessmentDetailMeasureSchema,
  ActivityOfAssessmentDetailSchema,
} from '../schemas';

export type ActivityType = z.infer<typeof ActivitySchema>;

export type ActivityResponse = z.infer<
  typeof ActivityResponseSchema
>;

export type ActivityOfAssessmentType = z.infer<
  typeof ActivityOfAssessmentSchema
>;

export type ActivityOfAssessmentResponse = z.infer<
  typeof ActivityOfAssessmentResponseSchema
>;

export type ActivityOfAssessmentDetailMeasureType =
  z.infer<typeof ActivityOfAssessmentDetailMeasureSchema>;

export type ActivityOfAssessmentDetailType = z.infer<
  typeof ActivityOfAssessmentDetailSchema
>;
