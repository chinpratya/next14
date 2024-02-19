import { faker } from '@faker-js/faker';

import { cycle } from './cycle';

const list = [
  {
    dataLifeCycleID:
      '66ef3925-51f3-41b4-a8d8-65f1d7179817',
    activityID: '98f0ae4c-8c3b-4786-ad7d-ac07f60fdbf6',
    name: 'การรับสมัครพนักงาน',
    actorType: 'data-processor',
    group: 'GOV Service',
    status: 'active',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    organization: 'สภาคณาจารย์และข้าราชการ',
    created_dt: faker.date.past().toISOString(),
    created_by: faker.name.fullName(),
  },
];

export const dataLifecycle = {
  list,
  cycle,
};
