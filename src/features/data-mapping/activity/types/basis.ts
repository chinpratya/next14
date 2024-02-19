import { z } from 'zod';

import {
  ActivityBasisSchema,
  ActivityBasisPurposeSchema,
  ActivityBasisPurposeResponseSchema,
  ActivityBasisPurposeDataCategorySchema,
  ActivityBasisPurposeDataCategoryResponseSchema,
  ActivityBasisDetailSchema,
} from '../schemas';

export type ActivityBasis = z.infer<
  typeof ActivityBasisSchema
>;

export type ActivityBasisDetail = z.infer<
  typeof ActivityBasisDetailSchema
>;

export type ActivityBasisPurposeType = z.infer<
  typeof ActivityBasisPurposeSchema
>;

export type ActivityBasisPurposeResponse = z.infer<
  typeof ActivityBasisPurposeResponseSchema
>;

export type ActivityBasisPurposeDataCategory = z.infer<
  typeof ActivityBasisPurposeDataCategorySchema
>;

export type ActivityBasisPurposeDataCategoryResponse =
  z.infer<
    typeof ActivityBasisPurposeDataCategoryResponseSchema
  >;
