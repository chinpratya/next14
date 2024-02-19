import { primaryKey } from '@mswjs/data';
import { v4 as uid } from 'uuid';

export const organizationAuditLog = {
  username: String,
  email: String,
  first_name: String,
  last_name: String,
  project: String,
  module: String,
  method: String,
  endpoint: Object,
  ip_address: String,
  user_agent: String,
  browser: String,
  user_os: String,
  device_type: String,
  request_type: String,
  request_id: String,
  organization: String,
  country: String,
  ObjectUUID: primaryKey(uid),
  createdDt: String,
  createdBy: String,
  updatedDt: String,

  //   ObjectUUID: primaryKey(uid),
  //   ip_address: String,
  //   email: String,
  //   endpoint: Object,
  //   browser: String,
  //   device_type: String,
  //   request_type: String,
  //   country: String,
  //   module: String,
  //   project: String,
  //   createdDt: String,
};
