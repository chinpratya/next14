import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationInitPassword = {
  id: primaryKey(uid),
  password_type: String,
  password: String,
  temporary: Boolean,
};

export const organizationInitPasswordExternal = {
  id: primaryKey(uid),
  password_type: String,
  password: String,
  temporary: Boolean,
};
