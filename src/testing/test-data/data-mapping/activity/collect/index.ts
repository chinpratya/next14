import { channels } from './channels';
import { dataRetention } from './data-retention';
import { purpose } from './purpose';

const collectData = {
  ObjectUUID: '323ff388-dd25-4a3c-ad94-4f3c3e6bda9f',
  dataStoreTypeID: [
    '94230236-05a3-41cc-b925-fa5a7b3c7e71',
    'f620e996-a5ac-4ef8-8706-8ebc76ca54d2',
  ],
  dataStoreType: ['storageType1', 'storageType2'],
  isDataUsagePeriod: true,
  dataUsagePeriod: {
    day: '1',
    month: '2',
    year: '3',
    description: 'This is the year of the category',
  },
  dataRetentionMethod: 'DEFAULT',
  rightsAndMethodAccessPersonalInformation: 'private',
  methodRemoveWhenExpire: 'DEFAULT',
  created_by: 'system',
  created_dt: '2023-02-01T17:24:54Z',
  updated_by: 'system',
  updated_dt: '2023-03-01T17:24:54Z',
};

export const collect = {
  collectData,
  purpose,
  channels,
  dataRetention,
};
