import { ReactNode } from 'react';
import { z } from 'zod';

import {
  IncidentSchema,
  IncidentResponseSchema,
  IncidentInfoSchema,
  IncidentInfoResponseSchema,
  IncidentLogFieldSchema,
} from '../schemas';

export type Incident = z.infer<typeof IncidentSchema>;

export type IncidentInfo = z.infer<
  typeof IncidentInfoSchema
>;

export type IncidentResponse = z.infer<
  typeof IncidentResponseSchema
>;

export type IncidentInfoResponse = z.infer<
  typeof IncidentInfoResponseSchema
>;

export type IncidentLogField = z.infer<
  typeof IncidentLogFieldSchema
>;

export type Tab = {
  tabItems: {
    key: string;
    label: string | ReactNode;
  }[];
  currentKey: string;
};
