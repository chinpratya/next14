import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils';

export const organizationUserAuthSession = {
  session_id: primaryKey(uid),
  username: String,
  user_id: String,
  ip_address: String,
  start: Number,
  last_access: Number,
  remember_me: Boolean,
  device: String,
  device_version: String,
};

export const organizationUserAuthUserGroup = {
  id: primaryKey(uid),
  name: String,
  description: String,
  composite: Boolean,
  clientRole: Boolean,
  containerId: String,
};

export const organizationUserAuthRole = {
  id: primaryKey(uid),
  name: String,
  path: String,
};

export const organizationUserAuthInfo = {
  id: primaryKey(uid),
  username: String,
  email_verified: String,
  prefix_name: String,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  phone_prefix: String,
  time_zone: String,
  datetime_format: String,
};
