import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementDashboardAccept = {
  activityID: primaryKey(uuid),
  name: String,
  acceptCount: Number,
  rejectCount: Number,
};
