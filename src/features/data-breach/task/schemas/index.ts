import { z } from 'zod';

import { MetaSchema, ResponseSchema } from '@/schema';

import {
  RiskLikelihoodSchema,
  RiskEffectSchema,
} from '../../shared';

export const TaskSchema = z.object({
  workID: z.string(),
  name: z.string(),
  priority: z.string(),
  AssigneName: z.array(z.string()),
  endDate: z.string(),
  timeReminded: z.string(),
  isOvertime: z.boolean(),
  startDate: z.string(),
  AssigneStatus: z.string(),
  requiredJob: z.boolean(),
  resolutionCloseJob: z.boolean(),
  resolutionEndJob: z.boolean(),
  IdentifyTask: z.boolean(),
  isCloseIfReject: z.boolean(),
  isAPI: z.boolean(),
  typeOfRequest: z.string().optional(),
  stateName: z.string().optional(),
  isPermission: z.boolean().optional(),
});

export const TaskResponseSchema = ResponseSchema.extend({
  data: z.array(TaskSchema),
});

export const TaskRemindedTimeSchema = z.object({
  type: z.string(),
  value: z.number(),
});

export const TaskRemindedSchema = z.object({
  type: z.string(),
  time: TaskRemindedTimeSchema,
  responsible: z.array(z.string()),
});

export const TaskDetailSchema = z.object({
  workID: z.string(),
  name: z.string(),
  delegateID: z.array(z.string()),
  priority: z.string(),
  isAPI: z.boolean(),
  apiURL: z.string().nullable(),
  IdentifyTask: z.boolean(),
  description: z.string(),
  requiredJob: z.boolean(),
  resolutionCloseJob: z.boolean(),
  resolutionEndJob: z.boolean(),
  endDate: z.object({
    type: z.string(),
    value: z.number(),
  }),
  isSetNotificationTime: z.boolean(),
  isCloseIfReject: z.boolean(),
  status: z.string(),
  taskResolution: z.string(),
  massage: z.string(),
  reminded: z.array(TaskRemindedSchema),
  workflowID: z.string(),
  requestID: z.string(),
  isPermission: z.boolean().optional(),
  isRisk: z.boolean().optional(),
});

export const TaskVersionDataSchema = z.object({
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

export const TaskVersionResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      z.object({
        type: z.string(),
        data: TaskVersionDataSchema,
      })
    ),
  });

export const ReasonSchema = MetaSchema.extend({
  reason: z.array(MetaSchema),
});

export const TaskMetaSchema = z.object({
  status: z.array(MetaSchema),
  reasonForReject: z.array(ReasonSchema),
  reasonForClose: z.array(ReasonSchema),
});

export const TaskAssessmentSchema = z.object({
  likelihood: z.array(RiskLikelihoodSchema),
  likelihoodValue: z.number(),
  effect: z.array(RiskEffectSchema),
  effectValue: z.number(),
  isRiskAssessment: z.boolean(),
});
