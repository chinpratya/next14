import { primaryKey } from '@mswjs/data';
import { v4 as uuid } from 'uuid';

export const dataMappingRopa = {
  ropaID: primaryKey(uuid),
  version: Number,
  actorType: Array,
  created_by: String,
  created_dt: String,
  updated_by: String,
  updated_dt: String,
};
