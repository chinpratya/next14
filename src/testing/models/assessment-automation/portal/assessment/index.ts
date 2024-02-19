import { primaryKey } from '@mswjs/data';

export * from './form';

export const compliancePortalAssessment = {
  ObjectUUID: primaryKey(String),
  name: String,
  group: String,
  status: String,
  form: String,
  formName: String,
  sendDt: String,
  deadlineDt: String,
  approveDt: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
  startDt: String,
  endDt: String,
};
