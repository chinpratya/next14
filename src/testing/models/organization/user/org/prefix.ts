import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const organizationUserOrgPrefix = {
  prefix_id: primaryKey(uid),
  name: String,
  name_en: String,
  description: String,
};
