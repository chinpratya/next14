import { z } from 'zod';

import {
  IncidentTemplateSchema,
  IncidentTemplateResponseSchema,
  IncidentTemplateEventFormSchema,
} from '../schemas';

export type IncidentTemplateType = z.infer<
  typeof IncidentTemplateSchema
>;

export type IncidentTemplateResponse = z.infer<
  typeof IncidentTemplateResponseSchema
>;

export type IncidentTemplateEventFormType = z.infer<
  typeof IncidentTemplateEventFormSchema
>;
