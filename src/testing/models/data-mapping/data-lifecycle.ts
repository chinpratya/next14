import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const dataMappingDataLifecycle = {
  dataLifeCycleID: primaryKey(uuid),
  activityID: String,
  name: String,
  actorType: String,
  group: String,
  status: String,
  owner: String,
  organization: String,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
