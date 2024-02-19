import { faker } from '@faker-js/faker';

const list = [
  {
    groupId: '2e38ec34-6d26-4ca2-b8ce-4627056175d8',
    name: 'ผู้ดูแลระบบ',
    name_en: 'System default',
    description: '',
    total_user: 1,
    created_dt: faker.date.past().toString(),
    created_by: faker.name.fullName(),
  },
  {
    groupId: '2e38ec34-6d26-4ca3-b8ce-4627099175d8',
    name: 'ผู้ใช้งาน',
    name_en: 'SA',
    description: '',
    total_user: 10,
    created_dt: faker.date.past().toString(),
    created_by: faker.name.fullName(),
  },
];

const listRole = [
  {
    roleId: '77ccb486-eaaf-4a89-80ae-a9c190ebd737',
    name: 'System default',
    name_en: 'System default',
    status: 'active',
    description: '-',
    created_dt: '2023-06-16T08:39:58Z',
    created_by: 'system',
    updated_dt: '',
    updated_by: '',
  },
];

const listMember = [
  {
    userId: '0fa33efc-7d6c-46cd-bcf2-91a2cdb57b20',
    first_name: 'นายธาวัน',
    last_name: 'สวัสดิวงศ์',
    first_name_en: 'นายธาวัน',
    last_name_en: 'สวัสดิวงศ์',
    email: 'Paphawin@gmail.com',
    created_dt: '2023-04-05T02:49:34.401Z',
    created_by: 'Thawan@gmail.com',
    updated_dt: '2023-05-05T02:49:34.401Z',
    updated_by: 'Thawan@gmail.com',
    phone_number: '08-99999999',
    status: 'UNVERIFY',
    employee_classification: 'External',
    organization_labels: ['Lv1', 'Lv2', 'Lv3'],
  },
];

export const group = {
  list,
  listRole,
  listMember,
};
