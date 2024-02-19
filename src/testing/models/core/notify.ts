import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const coreNotify = {
  _id: primaryKey(uid),
  module: String,
  name: String,
  provider: String,
  sender: Array,
  configuration: {
    host: String,
    port: Number,
    username: String,
    password: String,
    is_auth: Boolean,
    transport: String,
    endpoint: String,
    access_token: String,
    secret_token: String,
    header: Array,
  },
  status: String,
  created_date: String,
  organization: String,
  enabled: Boolean,
};
