import { primaryKey } from '@mswjs/data';

export const dsarAutomationTask = {
  workID: primaryKey(String),
  isrequest: Boolean,
  workName: String,
  workflowname: String,
  stage: String,
  approve: String,
  status: String,
  deadlineDt: String,
  createDt: String,

  approveID: String,
  description: String,
  remindDt: String,
  isRequired: Boolean,
  isComment: Boolean,
  isResolution: Boolean,
  requestID: String,
  email: String,
  typeRequest: String,
  labels: String,
  reminded: Array,
  isSetNotificationTime: Boolean,
  endDate: Number,
};

export const dsarAutomationTaskVersion = {
  ObjectUUID: primaryKey(String),
  updateBy: String,
  updateDt: String,
  FieldName: String,
  oldVersion: String,
  newVersion: String,
};
