import { preview } from './preview';

const list = [
  {
    preferenceID: 'ef1cebd0-2ebf-4718-8491-6e6354b155d1',
    name: 'Preference1',
    description: 'xxx',
    activitys: [
      {
        activityID:
          '3aacc747-04f5-43aa-933e-43ece2ce3b38',
        activity: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
      },
      {
        activityID:
          '98f0ae4c-8c3b-4786-ad7d-ac07f60fdbf6',
        activity: 'การรับสมัครพนักงาน',
      },
    ],
    organizationID:
      'fe7d0ca1-e054-4edc-8ea0-47001a39f66c',
    organization: 'สาขาวิชาการ',
    delegateID: 'test',
    delegate: '',
    status: 'publish',
    version: 1,
    isCreateNewUser: true,
    createdBy: 'Frontend Dev',
    createdDt: '2023-08-01T00:00:00.000Z',
  },
  {
    preferenceID: 'cf19a462-7ef9-4bb0-98be-71fe0a3edb4b',
    name: 'Preference2',
    description: 'xxx',
    activitys: [
      {
        activityID:
          '3aacc747-04f5-43aa-933e-43ece2ce3b38',
        activity: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
      },
    ],
    organizationID:
      'fe7d0ca1-e054-4edc-8ea0-47001a39f66c',
    organization: 'สาขาวิชาการ',
    delegateID: 'test',
    delegate: '',
    status: 'draft',
    version: 1,
    isCreateNewUser: false,
    createdBy: 'Frontend Dev',
    createdDt: '2023-08-01T00:00:00.000Z',
  },
];

export const preferenceCenters = {
  list,
  preview,
};
