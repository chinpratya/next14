import { z } from 'zod';

export const dpiaSchema = z.object({
  purpose: z.string(),
  reference: z.string(),
  project: z.string(),
  listOfPersonalData: z.string(),
  description: z.string(),
});

export const needForPreparationDpiaSchema = z.object({
  purpose: z.string(),
  type: z.string(),
});

export const natureOfDataProcessingSchema = z.object({
  description: z.string().optional(),
  source: z.string(),
  isShare: z.boolean(),
  shareDetail: z.string(),
  riskProcessing: z.string().optional(),
  fileID: z.string().optional(),
  fileUrl: z.string().optional(),
});

export const processingScopeSchema = z.object({
  scope: z.string().optional(),
  isSensitiveData: z.boolean(),
  sensitiveDataDetail: z.string(),
  storeSensitiveData: z.string().optional(),
  periodStoreSensitiveData: z.number(),
  impactDataSubject: z.number().optional(),
  country: z.string().optional(),
});

export const processingDetailSchema = z.object({
  relationshipOfDataSubject: z.string(),
  controlOfDataSubject: z.string(),
  isDataSubjectExpectProcessing: z.boolean(),
  isWorryProcessing: z.boolean(),
  isNewProcessing: z.boolean(),
  levelOfTechForProcessing: z.string(),
  isSocietyWorry: z.boolean(),
  societyWorryDetail: z.string(),
});

export const purposeOfProcessingSchema = z.object({
  purpose: z.string(),
  impact: z.string(),
  benefit: z.string(),
});

export const opinionSchema = z.object({
  isOtherPeople: z.boolean(),
  otherPeopleDetail: z.string(),
  isProcessingForResearch: z.boolean(),
  processingForResearchDetail: z.string(),
  isPlanConsult: z.boolean(),
});

export const measureApplyLawSchema = z.object({
  lawBasis: z.string(),
  processingHelpResearchComplete: z.string(),
  isOtherWay: z.boolean(),
  otherWayDetail: z.string(),
  preventiveMeasures: z.string(),
  maintainDataQuality: z.string(),
  dataOfDataSubject: z.string(),
  carryOutRightsOfDataSubject: z.string(),
  isPersonalDataProcessorControlMeasures: z.boolean(),
  personalDataProcessorControlMeasuresDetail: z.string(),
  dataTranfer: z.string(),
});
export const ActivityDpiaSchema = z.object({
  dpia: z.union([dpiaSchema, z.null()]),
  needForPreparationDpia: z.union([
    needForPreparationDpiaSchema,
    z.null(),
  ]),
  natureOfDataProcessing: z.union([
    natureOfDataProcessingSchema,
    z.null(),
  ]),
  processingScope: z.union([
    processingScopeSchema,
    z.null(),
  ]),
  processingDetail: z.union([
    processingDetailSchema,
    z.null(),
  ]),
  purposeOfProcessing: z.union([
    purposeOfProcessingSchema,
    z.null(),
  ]),
  opinion: z.union([opinionSchema, z.null()]),
  measureApplyLaw: z.union([
    measureApplyLawSchema,
    z.null(),
  ]),
  lastUpdatedDt: z.union([z.string(), z.null()]),
});

export const ActivityDpiaInitSchema = z.object({
  natureOfDataProcessing: natureOfDataProcessingSchema,
  processingScope: processingScopeSchema,
});
