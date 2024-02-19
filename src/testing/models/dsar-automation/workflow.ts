import { primaryKey, manyOf } from '@mswjs/data';

export const dsarAutomationWorkflowUser = {
  id: primaryKey(String),
  userID: String,
  name: String,
  position: String,
  organization: Array,
};

export const dsarAutomationWorkflowStage = {
  stageID: primaryKey(String),
  order: Number,
  name: String,
  set_start_time: Boolean,
  auto_complete: Boolean,
  sent_email_if_start: Boolean,
  sent_email_if_complete: Boolean,
};

export const dsarAutomationWorkflow = {
  workflowID: primaryKey(String),
  name: String,
  status: String,
  description: String,
  tagID: Array,
  tagName: Array,
  stages: manyOf('dsarAutomationWorkflowStage'),
  users: manyOf('dsarAutomationWorkflowUser'),
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const dsarAutomationWorkflowTaskReminded = {
  id: primaryKey(String),
  type: String,
  time: Number,
  responsible: Array,
};

export const dsarAutomationWorkflowTask = {
  taskID: primaryKey(String),
  name: String,
  description: String,
  delegateID: Array,
  delegateName: Array,
  priority: String,
  endDate: Number,
  apiURL: String,
  isAPI: Boolean,
  IdentifyTask: Boolean,
  requiredJob: Boolean,
  resolutionCloseJob: Boolean,
  resolutionEndJob: Boolean,
  isSetNotificationTime: Boolean,
  isCloseIfReject: Boolean,
  reminded: manyOf('dsarAutomationWorkflowTaskReminded'),
};
