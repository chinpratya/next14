import { preview } from './preview';
import { purpose } from './purpose';

const list = [
  {
    ObjectUUID: '838aaa5e-569a-4f73-9164-6a050a286173',
    name: 'Consent Activity',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'inactive',
    organization: 'สาขาวิชาการ',
    organizationID:
      'fe7d0ca1-e054-4edc-8ea0-47001a39f66c',
    created_by: 'Frontend Dev',
    created_dt: '2023-08-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-08-01T00:00:00.000Z',
  },
];

export const activity = {
  list,
  purpose,
  preview,
};
