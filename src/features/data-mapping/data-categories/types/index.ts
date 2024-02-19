import { z } from 'zod';

import {
  DataCategorySchema,
  DataCategoriesResponseSchema,
  MetaCategoriesResponseSchema,
  DataElementOfCategoriesResponseSchema,
  DataElementOfCategoriesSchema,
  DataCategoryClassificationSchema,
  DataCategoriesAssessmentResponseSchema,
  DataCategoriesAssessmentSchema,
  DataCategoriesAssessmentsDetailSchema,
  DataCategoriesdataElementlSchema,
} from '../schemas';

export type DataCategory = z.infer<
  typeof DataCategorySchema
>;

export type DataCategoriesdataElementl = z.infer<
  typeof DataCategoriesdataElementlSchema
>;

export type DataCategoriesAssessment = z.infer<
  typeof DataCategoriesAssessmentSchema
>;

export type DataCategoriesAssessmentsDetail = z.infer<
  typeof DataCategoriesAssessmentsDetailSchema
>;

export type DataCategoriesResponse = z.infer<
  typeof DataCategoriesResponseSchema
>;

export type DataCategoriesAssessmentResponse = z.infer<
  typeof DataCategoriesAssessmentResponseSchema
>;

export type MetaCategoriesResponse = z.infer<
  typeof MetaCategoriesResponseSchema
>;

export type DataElementOfCategoriesResponse = z.infer<
  typeof DataElementOfCategoriesResponseSchema
>;

export type DataElementOfCategories = z.infer<
  typeof DataElementOfCategoriesSchema
>;

export type DataCategoryClassification = z.infer<
  typeof DataCategoryClassificationSchema
>;
