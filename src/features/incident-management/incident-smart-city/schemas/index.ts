import { z } from 'zod';

import {
  ConsentFormSchema,
  ResponseSchema,
} from '@/schema';

export const RequestSchema = z.object({
  requestID: z.string(),
  name: z.string(),
  status: z.string(),
  timeReminded: z.number(),
  workflowName: z.string(),
  isExtraTime: z.boolean(),
  createDt: z.string(),
  updatedDt: z.string(),
  requestType: z.object({
    event_cateogry: z.string(),
    sub_event_cateogry: z.string(),
    event_cateogry_type: z.string(),
  }),
});

export const RequestResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestSchema),
  });

export const RequestStatesSchema = z.object({
  stateID: z.string(),
  order: z.number(),
  stageName: z.string(),
});

export const RequestDetailSchema = z.object({
  requestID: z.string(),
  webfromName: z.string(),
  typeOfRequest: z.string(),
  approvedID: z.string(),
  approved: z.string(),
  status: z.string(),
  states: z.array(RequestStatesSchema),
  currecnt_state: z.number(),
  workflow: z.string(),
  workflowVersion: z.number(),
  createDt: z.string().optional(),
  updateDt: z.string().optional(),
  isExtraTime: z.boolean(),
  isEditExtraTime: z.boolean(),
  endProcressDt: z.string(),
  limitExtraDt: z.string(),
  dataSubject: z.string().optional(),
  language: z.string(),
  requestType: z.object({
    event_cateogry: z.string(),
    sub_event_cateogry: z.string(),
    event_cateogry_type: z.string(),
  }),
  userID: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  severity: z.string(),
  closed_dt: z.string(),
});

export const RequestVersionDataSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
  requestID: z.string().optional(),
  time: z.string(),
  oldLang: z.string().optional(),
  newLang: z.string().optional(),
  oldTime: z.string().optional(),
  newTime: z.string().optional(),
  oldApproved: z.string().optional(),
  newApproved: z.string().optional(),
  oldStatus: z.string().optional(),
  newStatus: z.string().optional(),
  oldstate: z.string().optional(),
  newstate: z.string().optional(),
});

export const RequestVersionSchema = z.object({
  version: z.array(
    z.object({
      type: z.string(),
      data: RequestVersionDataSchema,
    })
  ),
});

export const RequestFormSchema = z.object({
  formTemplate: ConsentFormSchema,
});

export const RequestActivitySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  stage: z.string(),
  responsible: z.string(),
  status: z.string(),
});

export const RequestActivityResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestActivitySchema),
  });

export const RequestTaskSchema = z.object({
  workID: z.string(),
  name: z.string(),
  workflowname: z.string(),
  status: z.string(),
  AssigneID: z.string(),
  AssigneName: z.string(),
  AssigneStatus: z.string(),
  deadline: z.string(),
  activationDt: z.string(),
});

export const RequestTaskResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestTaskSchema),
  });

export const DocumentSchema = z.object({
  filepath: z.string(),
  name: z.string(),
  description: z.string(),
});
export const RequestVerificationSchema = z.object({
  identifyID: z.string(),
  name: z.string(),
  comment: z.string(),
  status: z.string(),
  result: z.string(),
  updateDt: z.string(),
  verificationType: z.string().optional(),
  description: z.string().optional(),
  document: z.array(DocumentSchema).optional(),
});

export const RequestVerificationResponseSchema =
  ResponseSchema.extend({
    data: z.array(RequestVerificationSchema),
  });

export const LanguageSchema = z.object({
  languageID: z.string(),
  languageName: z.string(),
});

export const StateSchema = z.object({
  stageID: z.string(),
  stageName: z.string(),
});

export const IdetifyStatusSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
});

export const RequestMetaSchema = z.object({
  language: z.array(LanguageSchema),
  stage: z.array(StateSchema),
  status: z.array(IdetifyStatusSchema).optional(),
});
