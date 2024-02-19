import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const complianceAssessmentSubmission = {
  ObjectUUID: primaryKey(uid),
  name: String,
  assessmentName: String,
  assessmentID: String,
  group: String,
  dueDate: String,
  status: String,
  org: { count: Number, total: Number },
  respondent: { count: Number, total: Number },
  sendDt: String,
  sendBy: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const reason = {
  message: String,
  role: String,
  createdDt: String,
  createdBy: String,
};

export const complianceAssessmentSubmissionRespondent = {
  ObjectUUID: primaryKey(uid),
  orgID: String,
  orgName: String,
  respondentID: String,
  name: String,
  email: String,
  approverID: String,
  approverName: String,
  status: String,
  dueDate: String,
  isExtendTime: Boolean,
  startDt: String,
  endDt: String,
  sendDt: String,
  submitDt: String,
  reasons: Array,
};

export const complianceAssessmentSubmissionAllRespondent =
  {
    ObjectUUID: primaryKey(uid),
    name: String,
    orgGroup: Array,
    industryGroup: String,
    businessCategory: String,
    branchs: Array,
  };

export const complianceAssessmentSubmissionInfo = {
  ObjectUUID: primaryKey(uid),
  assessmentID: String,
  assessmentName: String,
  startDt: String,
  endDt: String,
  group: String,
  name: String,
  respondentCount: Number,
  status: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const complianceAssessmentSubmissionRespondentLog =
  {
    ObjectUUID: primaryKey(uid),
    message: String,
    createdDt: String,
    createdBy: String,
  };

export const complianceAssessmentSubmissionRespondentAddRespondent =
  {
    ObjectUUID: primaryKey(uid),
    orgID: String,
    orgName: String,
    respondentID: String,
    name: String,
    email: String,
    approverID: String,
    approverName: String,
    status: String,
    dueDate: String,
    isExtendTime: Boolean,
    startDt: String,
    endDt: String,
    sendDt: String,
    submitDt: String,
    reasons: Array,
  };

export const complianceAssessmentSubmissionRespondentExtendTime =
  {
    ObjectUUID: primaryKey(uid),
    isExtendTime: Boolean,
    extendDt: String,
    reason: String,
  };

export const complianceAssessmentSubmissionRespondentChangeApprover =
  {
    ObjectUUID: primaryKey(uid),
  };

export const complianceAssessmentSubmissionSetting = {
  ObjectUUID: primaryKey(uid),
  createdBy: String,
  createdDt: String,
  updatedDt: String,
  data: {
    isSetDt: Boolean,
    startDt: String,
    endDt: String,
    isSchedule: Boolean,
    scheduleDt: String,
    isNotification: Boolean,
    dateDt: Array,
    notifications: Array,
  },
  dateDt: String,
};

export const complianceAssessmentSubmissionOrganizationRespondent =
  {
    ObjectUUID: primaryKey(uid),
    name: String,
    count: Number,
    total: Number,
    branchs: Array,
  };
