import { preview } from './preview';

const list = [
  {
    CollectionPointID:
      'deeeab61-213f-4858-8a4f-8386d64eedf2',
    name: 'CollectionPoint1',
    identifier: 'jitdee@gmail.com',
    status: 'publish',
    version: 2,
    createdBy: 'jitdee@gmail.com',
    createdDt: '2021-08-02T15:00:00.000Z',
    updatedBy: 'jitdee@gmail.com',
    updatedDt: '2021-08-03T15:00:00.000Z',
    description: 'test',

    activityID: '3aacc747-04f5-43aa-933e-43ece2ce3b38',
    activity: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
    organizationID:
      '2146fb54-fc59-4da9-ad90-11cb0f7e2d7e',
    organization: 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย',
    delegateID: 'db26f880-ee35-41e0-892b-14ad74f0eb09',
    delegate: 'jitdee',
    isUsing: false,
  },
  {
    CollectionPointID:
      'ded128aa-46c2-458e-9036-2b97846bee8a',
    name: 'CollectionPoint2',
    identifier: 'jitdee@gmail.com',
    status: 'draft',
    version: 3,
    createdBy: 'jitdee@gmail.com',
    createdDt: '2021-08-02T15:00:00.000Z',
    updatedBy: 'jitdee@gmail.com',
    updatedDt: '2021-08-03T15:00:00.000Z',

    description: 'test',
    activityID: '3aacc747-04f5-43aa-933e-43ece2ce3b38',
    activity: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
    organizationID:
      '2146fb54-fc59-4da9-ad90-11cb0f7e2d7e',
    organization: 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย',
    delegateID: 'db26f880-ee35-41e0-892b-14ad74f0eb09',
    delegate: 'jitdee',
    isUsing: true,
  },
];

const Meta = {
  policyType: [
    {
      ObjectUUID: '90835803-88ea-432d-b7fb-c1d80d1f36c4',
      name: 'Policy1',
    },
    {
      ObjectUUID: '5e41139e-91ba-4994-97fe-340f231485b4',
      name: 'Policy2',
    },
  ],
  displayType: [
    {
      ObjectUUID: 'horizontal',
      name: 'Row',
    },
    {
      ObjectUUID: 'vertical',
      name: 'Column',
    },
  ],
  relatePrivacyNotice: [
    {
      ObjectUUID: '17c03187-fe21-47d1-864e-58951be27de7',
      name: 'RelatePrivacyNotice1',
    },
    {
      ObjectUUID: 'b75335d0-84f9-43ae-8394-b1843c9fc87e',
      name: 'RelatePrivacyNotice2',
    },
  ],
};

const element = {
  id: 'b8770d57-4809-4848-a38a-f3bd7d62614c',
  dataSubjectIdentifier: 'อีเมล',
  purposes: [
    {
      purposeID: '252d94dd-851c-4bd1-9a8d-831934840304',
      purpose: 'Consent Purpose 1',
    },
    {
      purposeID: '450daab4-0c7d-49b3-aa23-fa6448e81d86',
      purpose: 'Consent Purpose 2',
    },
  ],
  dataElements: [
    {
      dataElementID:
        '11f38740-f63c-4134-9844-d5a841caffcb',
      dataElement: 'อีเมล',
    },
    {
      dataElementID:
        '750a3bc1-f205-46b8-a4be-fe2e2b050f5c',
      dataElement: 'เบอร์โทรศัพท์',
    },
    {
      dataElementID:
        'b42f9392-8575-401c-a33e-48da393fb6f5',
      dataElement: 'ชื่อ',
    },
    {
      dataElementID:
        '8ca89509-a88a-4928-b7d7-967b545744b6',
      dataElement: 'นามสกุล',
    },
  ],
};

const privacyNotice = {
  id: '1',
  isSentLink: true,
  doubleOptIn: true,
  isprivacyNotice: false,
  policyTypeID: '90835803-88ea-432d-b7fb-c1d80d1f36c4',
  policyType: 'test',
  privacyName: 'Policy1',
  relatePrivacyNoticeID:
    '17c03187-fe21-47d1-864e-58951be27de7',
  relatePrivacyNotice: 'RelatePrivacyNotice1',
  displayID: 'horizontal',
  display: 'Row',
  linkPrivacy: 'https://beta.onefence.co',
  privacyVersion: '1',
  UrlPolicy: 'https://beta.onefence.co/apps',
};

const history = [
  {
    objectUUID: '2e0b4c0e-1bad-47e5-91d0-dabdff3474a3',
    version: '1',
    createdBy: 'jitdee@gmail.com',
    createdDt: '2021-08-02T15:00:00.000Z',
    updatedBy: 'jitdee@gmail.com',
    updatedDt: '2021-08-03T15:00:00.000Z',
  },
  {
    objectUUID: '6a066499-2d04-41d8-9994-4401deba0975',
    version: '2',
    createdBy: 'jitdee@gmail.com',
    createdDt: '2021-08-02T15:00:00.000Z',
    updatedBy: 'jitdee@gmail.com',
    updatedDt: '2021-08-03T15:00:00.000Z',
  },
];

export const collectionPoint = {
  list,
  Meta,
  element,
  privacyNotice,
  history,
  preview,
};
