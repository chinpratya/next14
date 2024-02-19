import { primaryKey } from '@mswjs/data';

export const dsarAutomationRequest = {
  requestID: primaryKey(String),
  name: String,
  status: String,
  timeReminded: Number,
  isExtraTime: Boolean,
  createDt: String,

  webfromName: String,
  typeOfRequest: String,
  approvedID: String,
  approved: String,
  states: Array,
  currecnt_state: Number,
  workflow: String,
  workflowVersion: Number,
  isEditExtraTime: Boolean,
  endProcressDt: String,
  limitExtraDt: String,
  language: String,
};

export const dsarAutomationRequestForm = {
  requestID: primaryKey(String),
  formTemplate: {
    formConditions: Array,
    formItems: Array,
    formSetting: Object,
  },
};

export const dsarAutomationRequestTask = {
  workID: primaryKey(String),
  name: String,
  workflowname: String,
  status: String,
  AssigneID: String,
  AssigneName: String,
  AssigneStatus: String,
  deadline: String,
  activationDt: String,
};

export const dsarAutomationRequestVerification = {
  identifyID: primaryKey(String),
  name: String,
  comment: String,
  status: String,
  result: String,
  updateDt: String,
};
