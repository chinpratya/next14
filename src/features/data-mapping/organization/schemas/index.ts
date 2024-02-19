import { z } from 'zod';

import { ResponseSchema, EntitySchema } from '@/schema';

export const DataMappingOrganizationsSchema =
  EntitySchema.extend({
    name: z.string(),
    shortName: z.string(),
    entitySubID: z.string(),
    note: z.string(),
    entityId: z.string(),
  });

export const DataMappingOrganizationResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataMappingOrganizationsSchema),
  });
