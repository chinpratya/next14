import { z } from 'zod';

import { EntitySchema } from '@/schema';

export const BasisItemSchema = z.object({
  basisID: z.string(),
  name: z.string(),
});

export const RightsOfDataSubjectsItemSchema = z.object({
  rightsOfDataSubjectID: z.string(),
  name: z.string(),
});

export const ActivityLawfulBasisSchema =
  EntitySchema.extend({
    basis: z.array(BasisItemSchema),
    rightsOfDataSubjects: z.array(
      RightsOfDataSubjectsItemSchema
    ),
  });
