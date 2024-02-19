import { z } from 'zod';

import {
  DataMappingOrganizationResponseSchema,
  DataMappingOrganizationsSchema,
} from '../schemas';

export type DataMappingOrganizations = z.infer<
  typeof DataMappingOrganizationsSchema
>;

export type DataMappingOrganizationResponse = z.infer<
  typeof DataMappingOrganizationResponseSchema
>;
