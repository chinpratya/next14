import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const DataSubjectsSchema = z.array(
  z.object({
    dataSubjectID: z.string(),
    dataSubjectName: z.string(),
  })
);

export const DataCategoryClassificationSchema = z.object({
  categoryClassificationID: z.string(),
  categoryClassificationName: z.string(),
});

export const MetaCategorySchema = z.object({
  categoryID: z.string(),
  dataSubjectID: z.string(),
});

export const DataCategorySchema = EntitySchema.extend({
  categoryID: z.string(),
  name: z.string(),
  groupID: z.string(),
  groupName: z.string(),
  categoryClassifications: z.array(
    DataCategoryClassificationSchema
  ),
  organization: z.string(),
  organizationID: z.string(),
  dataSubjects: DataSubjectsSchema,
  status: z.string(),
  meta: MetaCategorySchema.optional(),
  tagID: z.array(z.string()).optional(),
  tagName: z.array(z.string()).optional(),
  numberPerson: z.number().optional(),
});

export const DataCategoriesResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataCategorySchema),
  });

export const DataCategoriesAssessmentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  dataSubject: z.string(),
  assessmentLavelName: z.string(),
  isAssessment: z.string(),
});

export const DataCategoriesAssessmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataCategoriesAssessmentSchema),
  });

export const CategoriesClassificationSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const MetaCategoriesResponseSchema =
  ResponseSchema.extend({
    data: z.object({
      categoryClassification: z.array(
        CategoriesClassificationSchema
      ),
    }),
  });

export const DataElementOfCategoriesSchema =
  EntitySchema.extend({
    dataElementID: z.string(),
    dataCategoryID: z.string(),
    name: z.string(),
    dataClassificationID: z.string(),
    dataClassification: z.string(),
  });

export const DataElementOfCategoriesResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataElementOfCategoriesSchema),
  });
export const DataCategoriesdataElementlSchema = z.object({
  name: z.string(),
  dataClassification: z.string(),
});
export const DataCategoriesAssessmentsDetailSchema =
  z.object({
    ObjectUUID: z.string(),
    assessmentName: z.string(),
    datasubject: z.string(),
    policy: z.string(),
    categoryName: z.string(),
    datasubjectGroup: z.array(z.string()),
    dataElement: z.array(
      DataCategoriesdataElementlSchema
    ),
    riskLavel: z.number(),
    effectLavel: z.number(),
    assessmentLavel: z.number(),
    assessmentLavelName: z.string(),
    isAssessment: z.string(),
    causesOfRisk: z.string(),
    causesOfEffect: z.string(),
    riskManagement: z.string(),
  });
