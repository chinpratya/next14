import { faker } from '@faker-js/faker';

const listDataCategories = [
  {
    categoryID: '526dd925-2698-4a72-b13d-73eb9033fa78',
    name: 'ข้อมูลสำหรับติดต่อสื่อสาร',
    groupID: '213123',
    groupName: 'ROP Service',
    categoryClassifications: [
      {
        categoryClassificationID:
          'e13f9128-f3f9-4979-b4e5-343ad956b634',
        categoryClassificationName: 'ข้อมูลทั่วไป',
      },
      {
        categoryClassificationID:
          '0e2954ea-09ef-448f-91e9-92a5cf9a6779',
        categoryClassificationName: 'ข้อมูลส่วนบุคคล',
      },
    ],
    dataSubjects: [
      {
        dataSubjectID: '213123',
        dataSubjectName: 'ROP Service',
      },
    ],
    organizationID:
      'fe7d0ca1-e054-4edc-8ea0-47001a39f66c',
    organization: 'สาขาวิชาการ',
    status: 'inactive',
    meta: {
      categoryID: 'f4cbc4a6-cbc5-4323-906f-eeb99f4ca972',
      dataSubjectID:
        '550803de-b29a-41b2-bcb7-7d5e33f371d1',
    },
    created_by: faker.name.fullName(),
    created_dt: faker.date.past().toISOString(),
    updated_by: faker.name.fullName(),
    updated_dt: faker.date.past().toISOString(),
  },
  {
    categoryID: '30dfdbea-710a-44ca-9845-b98979b94bb0',
    name: 'ข้อมูลสำหรับติดต่อสื่อสาร',
    groupID: '213124',
    groupName: 'GOV Service',
    categoryClassifications: [
      {
        categoryClassificationID:
          'e13f9128-f3f9-4979-b4e5-343ad956b634',
        categoryClassificationName: 'ข้อมูลทั่วไป',
      },
      {
        categoryClassificationID:
          '0e2954ea-09ef-448f-91e9-92a5cf9a6779',
        categoryClassificationName: 'ข้อมูลส่วนบุคคล',
      },
    ],
    dataSubjects: [
      {
        dataSubjectID: '213123',
        dataSubjectName: 'ROP Service',
      },
    ],
    organizationID:
      'fe7d0ca1-e054-4edc-8ea0-47001a39f66c',
    organization: 'สาขาวิชาการ',
    status: 'active',
    meta: {
      categoryID: 'f4cbc4a6-cbc5-4323-906f-eeb99f4ca972',
      dataSubjectID:
        '550803de-b29a-41b2-bcb7-7d5e33f371d1',
    },
    created_by: faker.name.fullName(),
    created_dt: faker.date.past().toISOString(),
    updated_by: faker.name.fullName(),
    updated_dt: faker.date.past().toISOString(),
  },
];

const listDataElements = [
  {
    dataCategoryID:
      '526dd925-2698-4a72-b13d-73eb9033fa78',
    dataElementID: '213123',
    name: 'ชื่อ',
    dataClassificationID: '1',
    dataClassification: 'ข้อมูลทั่วไป',
    organization: 'SP',
    created_by: 'System',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'System',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    dataCategoryID:
      '526dd925-2698-4a72-b13d-73eb9033fa78',
    dataElementID: '213125',
    name: 'ชื่อ-นามสกุล',
    dataClassificationID: '2',
    dataClassification: 'ข้อมูลส่วนบุคคล',
    organization: 'SP',
    created_by: 'System',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'System',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
];

const metaCategories = {
  categoryClassification: [
    {
      ObjectUUID: 'e13f9128-f3f9-4979-b4e5-343ad956b634',
      name: 'ข้อมูลทั่วไป',
    },
    {
      ObjectUUID: '0e2954ea-09ef-448f-91e9-92a5cf9a6779',
      name: 'ข้อมูลส่วนบุคคล',
    },
    {
      ObjectUUID: 'c7278634-88c6-4cf3-ae56-e8f94209b7ee',
      name: 'ข้อมูลอ่อนไหว',
    },
  ],
};

export const dataCategories = {
  listDataCategories,
  listDataElements,
  metaCategories,
};
