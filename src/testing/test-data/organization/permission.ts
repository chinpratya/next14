import { faker } from '@faker-js/faker';

import { uid } from '@/utils';

export const getPermissions = () => {
  const permissions = [];
  for (let i = 0; i < 10; i++) {
    permissions.push({
      id: uid(),
      name: faker.helpers.unique(faker.random.word),
      description: faker.lorem.sentence(),
      view: faker.datatype.boolean(),
      create: faker.datatype.boolean(),
      delete: faker.datatype.boolean(),
      edit: faker.datatype.boolean(),
      export: faker.datatype.boolean(),
      import: faker.datatype.boolean(),
    });
  }
  return permissions;
};

export const platformPermission = [
  {
    key: 'pdpakit',
    label: 'PDPA KIT',
    children: [
      {
        key: 'cookie',
        label: 'Cookie Consent Management',
      },
      {
        key: 'policy',
        label: 'Policy & Notice Management',
      },
      {
        key: 'dsar',
        label: 'DSAR Automation',
      },
      {
        key: 'consent',
        label: 'Consent Management',
      },
      {
        key: 'data-mapping',
        label: 'Data Mapping',
      },
    ],
  },
  {
    key: 'cyberfence',
    label: 'Cyber Fence',
    children: [],
  },
  {
    key: 'unifence',
    label: 'Unifence',
    children: [],
  },
];

const permissionModule = [
  {
    id: uid(),
    name: 'Cookie Consent Management',
    description:
      'สร้าง ปรับแต่ง และจัดการคุกกี้บนเว็บไซต์คุณได้อย่างง่ายดาย',
  },
  {
    id: uid(),
    name: 'Policy & Notice Management',
    description:
      'สร้างและบริหารนโยบายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ',
  },
  {
    id: uid(),
    name: 'DSAR Automation',
    description:
      'สร้างและจัดการเทมเพลตและขั้นตอนการทำงานเพื่อช่วยในการเข้าถึงเจ้าของข้อมูล (DSAR)',
  },
  {
    id: uid(),
    name: 'Consent Management',
    description:
      'สร้างและจัดการประเภทเว็บฟอร์มเพื่อรวบรวมความยินยอมจากผู้เยี่ยมชมไซต์',
  },
  {
    id: uid(),
    name: 'Data Mapping',
    description:
      'สร้างและบันทึกการจัดทำกิจกรรมการประมวลผล',
  },
];

export const permission = {
  permissions: getPermissions(),
  platformPermission,
  permissionModule,
};
