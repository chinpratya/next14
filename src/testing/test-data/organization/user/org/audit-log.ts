import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

const initialData = {
  email: 'timesatit@gmail.com',
  endpoint: {
    raw: '/user/auth/info',
    path: '/user/auth/info',
  },
  ip_address: '183.88.237.5',
  browser: 'Chrome',
  device_type: 'Desktop,Mac',
  request_type: 'READ',
  country: 'TH',
  module: 'organization',
  project: 'pdpa',
  createdDt: '2023-06-20T07:32:13Z',
};
const listAuditLog = Array.from(
  { length: 100 },
  (_, index) => ({
    ...initialData,
    ObjectUUID: uuid(),
    email: `${faker.name.firstName()}.${faker.name.lastName()}@gmail.com`,
    ip_address: `183.88.237.${index + 1}`,
  })
);

export const audit = {
  listAudit: listAuditLog,
};
