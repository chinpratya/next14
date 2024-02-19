import { primaryKey } from '@mswjs/data';

export const dsarAutomationWebform = {
  webfromID: primaryKey(String),
  name: String,
  approvedID: String,
  workflowID: String,
  endfrom: Number,
  remind: Number,
  defaultLanguage: String,
  detail: String,
  language: String,
  islanguage: Boolean,
  isCaptcha: Boolean,
  description: String,
  isSentEmail: Boolean,
  emailBody: String,
  sentbeforeclose: Number,
  isVerifyEmail: Boolean,
  lifetime: Number,
  status: String,
  version: Number,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
  form: String,
};

export const dsarAutomationWebformVersion = {
  ObjectUUID: primaryKey(String),
  version: Number,
  publishDt: String,
};

export const dsarAutomationWebformLanguage = {
  id: primaryKey(String),
  LanguageID: String,
  LanguageName: String,
  webfromID: String,
  form: String,
};
