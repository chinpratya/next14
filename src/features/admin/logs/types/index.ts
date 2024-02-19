import { z } from 'zod';

import {
  LogOrganizationResponseSchemas,
  LogOrganizationSchemas,
} from '../schemas';

export type LogOrganizationResponse = z.infer<
  typeof LogOrganizationResponseSchemas
>;

export type LogOrganization = z.infer<
  typeof LogOrganizationSchemas
>;
