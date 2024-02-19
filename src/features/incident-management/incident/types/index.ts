import { z } from 'zod';

import {
  IncidentListResponseSchema,
  IncidentSchema,
} from '../schemas';

export type IncidentListProps = z.infer<
  typeof IncidentSchema
>;

export type IncidentListResponse = z.infer<
  typeof IncidentListResponseSchema
>;
