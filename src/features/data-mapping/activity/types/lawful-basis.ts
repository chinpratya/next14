import { z } from 'zod';

import { ActivityLawfulBasisSchema } from '../schemas';

export type ActivityLawfulBasis = z.infer<
  typeof ActivityLawfulBasisSchema
>;

export type exitingDataElementType = {
  dataCategoryID: string;
  dataElements: string[];
};
