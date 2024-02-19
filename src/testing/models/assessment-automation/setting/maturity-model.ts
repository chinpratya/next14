import { primaryKey, manyOf } from '@mswjs/data';

export const complianceSettingMaturityDetailModel = {
  ObjectUUID: primaryKey(String),
  columnName: String,
  columnDetail: String,
  icon: String,
  description: String,
};

export const complianceSettingMaturityModel = {
  ObjectUUID: primaryKey(String),
  name: String,
  modelType: String,
  numberOfWebformAvailable: Number,
  description: String,
  detail: manyOf('complianceSettingMaturityDetailModel'),
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};
