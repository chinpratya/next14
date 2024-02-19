import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const FilesSchema = z.object({
  fileID: z.string(),
  fileName: z.string(),
});
export const FilesUploadSchema = z.object({
  uid: z.string(),
  name: z.string(),
});
export const AssessmentInventorySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.array(z.string()),
  version: z.number(),
  status: z.string(),
  description: z.string().optional(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
  files: z.array(FilesSchema).optional(),
});

export const InventoryResponseSchema =
  ResponseSchema.extend({
    data: z.array(AssessmentInventorySchema),
  });

export const InventoryDetailResponseSchema =
  ResponseSchema.extend({
    data: AssessmentInventorySchema,
  });

export const AssessmentResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});
export const DuplicateResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  ObjectUUID: z.string(),
});

export const CreateAssessmentInventoryPayloadSchema =
  z.object({
    name: z.string(),
    type: z.array(z.string()),
    description: z.string(),
  });

export const ImportAssessmentInventoryPayloadSchema =
  z.object({
    name: z.string(),
    type: z.string(),
    description: z.string(),
  });

export const BaseInfoPayloadSchema = z.object({
  name: z.string(),
  type: z.array(z.string()),
  description: z.string(),
  files: z.array(FilesSchema).optional(),
});
export const DuplicateAssessmentInventoryPayloadSchema =
  z.object({
    basicInfo: BaseInfoPayloadSchema,
    webform: z.array(z.string()),
    scores: z.array(z.string()),
    logics: z.array(z.string()),
  });

export const AssessmentFormResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    form: z.array(z.any()).optional(),
    logics: z.array(z.any()).optional(),
    score: z.array(z.any()).optional(),
  }),
});

export const updateAssessmentInventoryPayloadSchema =
  z.object({
    form: z.array(z.string()).optional(),
    logics: z.array(z.string()).optional(),
    score: z.array(z.string()).optional(),
  });
