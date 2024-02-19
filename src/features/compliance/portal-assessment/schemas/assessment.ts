import { z } from 'zod';

export const PortalAssessmentStatusSchema = z.enum([
  'waiting_progress',
  'in_progress',
  'approve',
  'waiting_approve',
  'waiting_update',
  'reject',
  'in_progress_approve',
  'overdue',
]);

export const PortalAssessmentResultStatusSchema = z.enum([
  'draft',
  'wait_send',
  'ready_to_send',
  'in_progress',
  'success',
  'reject',
]);
export const ApprovalSchema = z.object({
  count: z.number(),
  total: z.number(),
});
export const PortalAssessmentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  group: z.union([z.string(), z.null()]).optional(),
  lastStatus: z.string().optional(),
  status: PortalAssessmentStatusSchema,
  sendDt: z.union([z.string(), z.null()]).optional(),
  deadlineDt: z.union([z.string(), z.null()]).optional(),
  approveDt: z.union([z.string(), z.null()]).optional(),
  formName: z.string().optional(),
  createdDt: z.union([z.string(), z.null()]),
  createdBy: z.string(),
  updatedDt: z.union([z.string(), z.null()]),
  updatedBy: z.string(),
  form: z.array(z.any()).optional(),
  approval: ApprovalSchema.optional(),
  startDt: z.union([z.string(), z.null()]).optional(),
  endDt: z.union([z.string(), z.null()]).optional(),
});

export const ListPortalAssessmentResponseSchema =
  z.object({
    code: z.number(),
    message: z.string().optional(),
    data: z.array(PortalAssessmentSchema),
  });

export const PortalAssessmentIssueResponseSchema =
  z.object({
    code: z.number(),
    message: z.string().optional(),
    data: z.array(PortalAssessmentSchema),
  });

export const ResultAssessmentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  assessmentName: z.string(),
  group: z.string().optional(),
  status: PortalAssessmentResultStatusSchema.optional(),
  approval: ApprovalSchema.optional(),
  submitDt: z.union([z.string(), z.null()]).optional(),
  createdDt: z.union([z.string(), z.null()]).optional(),
  createdBy: z.string().optional(),
  updatedDt: z.union([z.string(), z.null()]).optional(),
  updatedBy: z.string().optional(),
});

export const ResultAssessmentResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  data: z.array(ResultAssessmentSchema),
});

export const PortalIssueResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  haveIssue: z.boolean(),
  status: z.enum(['issue', 'approved']),
});

export const ResultAssessmentDetailSchema = z.object({
  ObjectUUID: z.string(),
  organizationID: z.string(),
  orgName: z.string(),
  respondentID: z.string(),
  name: z.string(),
  email: z.string(),
  approverID: z.string(),
  approverName: z.string(),
  status: z.string(),
  dueDate: z.string(),
  isExtendTime: z.boolean(),
});

export const ResultAssessmentDetailResponseSchema =
  z.object({
    code: z.number(),
    message: z.string().optional(),
    data: z.array(ResultAssessmentDetailSchema),
  });
export const Notificationschema = z.object({
  notiType: z.union([z.string(), z.null()]).optional(),
  notiDt: z.union([z.string(), z.null()]).optional(),
});

export const SettingResultchema = z.object({
  isSetDt: z.boolean(),
  startDt: z.union([z.string(), z.null()]).optional(),
  endDt: z.union([z.string(), z.null()]).optional(),
  isNotification: z.boolean(),
  notifications: z.array(Notificationschema),
  isSchedule: z.boolean(),
  scheduleDt: z.union([z.string(), z.null()]).optional(),
});

export const SettingResultResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  data: SettingResultchema,
});
