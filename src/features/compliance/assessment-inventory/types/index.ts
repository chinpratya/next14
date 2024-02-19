import { z } from 'zod';

import {
  AssessmentInventorySchema,
  InventoryResponseSchema,
  AssessmentResponseSchema,
  CreateAssessmentInventoryPayloadSchema,
  ImportAssessmentInventoryPayloadSchema,
  InventoryDetailResponseSchema,
  FilesUploadSchema,
  FilesSchema,
  DuplicateAssessmentInventoryPayloadSchema,
  DuplicateResponseSchema,
  AssessmentFormResponseSchema,
  updateAssessmentInventoryPayloadSchema,
} from '../schemas';

export type AssessmentInventory = z.infer<
  typeof AssessmentInventorySchema
>;
export type FileUploadType = z.infer<
  typeof FilesUploadSchema
>;
export type FileType = z.infer<typeof FilesSchema>;

export type InventoryResponse = z.infer<
  typeof InventoryResponseSchema
>;
export type InventoryFormResponse = z.infer<
  typeof AssessmentFormResponseSchema
>;
export type InventoryDetailResponse = z.infer<
  typeof InventoryDetailResponseSchema
>;
export type createAssessmentResponse = z.infer<
  typeof AssessmentResponseSchema
>;
export type DeleteAssessmentResponse = z.infer<
  typeof AssessmentResponseSchema
>;
export type duplicateAssessmentResponse = z.infer<
  typeof DuplicateResponseSchema
>;
export type createAssessmentPayload = z.infer<
  typeof CreateAssessmentInventoryPayloadSchema
>;
export type importssessmentPayload = z.infer<
  typeof ImportAssessmentInventoryPayloadSchema
>;

export type duplicateAssessmentPayload = z.infer<
  typeof DuplicateAssessmentInventoryPayloadSchema
>;

export type updateAssessmentdetailPayload = z.infer<
  typeof updateAssessmentInventoryPayloadSchema
>;
