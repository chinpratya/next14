import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const compliancePortalAssessmentFormComment = {
  ObjectUUID: primaryKey(uid),
  message: String,
  status: String,
  isApprove: Boolean,
  isRead: Boolean,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const compliancePortalAssessmentFormCommentIssue =
  {
    formId: primaryKey(String),
    haveIssue: Boolean,
    status: String,
  };
