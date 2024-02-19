import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const cookieManagementDomain = {
  domainID: primaryKey(uuid),
  name: String,
  site: String,
  totalPageScan: Number,
  cookies: Number,
  scanDate: String,
  status: String,
  limit_scan: Number,
  setting: String,
};
