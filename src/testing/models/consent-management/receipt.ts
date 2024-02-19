import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const consentManagementReceipt = {
  receiptsID: primaryKey(uuid),
  dataSubjectID: String,
  dataSubject: String,
  email: String,
  status: String,
  collectionPointID: String,
  collectionPoint: String,
  version: String,
  CollectionMethod: String,
  activityGroup: String,
  dataController: String,
  timestamp: String,
};
