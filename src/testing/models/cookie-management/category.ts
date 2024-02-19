import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const cookieManagementCategory = {
  id: primaryKey(uuid),
  domainID: String,
  cookies: String,
  category: String,
};
