const list = [
  {
    purposeID: '536a79f7-2449-4ba0-abf7-f42610413f8e',
    consentReceiptsID: '40645',
    dataSubject: 'ลูกค้า (ผู้เยาว์)',
    email: 'satit@gmail.com',
    status: 'active',
    collectionPoint: 'ROP Website',
    activityGroup: 'Commercial',
    purposeGroup: 'Commercial',
    duration: {
      day: '0',
      month: '0',
      year: '10',
    },
    expiryDate: '2029-12-31',

    receiptID: '424296f4-a1de-495c-8dcf-c07733bfec7b',
    transactionsID:
      '1192deef-d903-4f07-ba79-c8151b847e1f',
    source: '',
    subjectIdentifierID: '40645',
    interactionType: 'cookie',
    cratedDt: '2023-09-01T11:00:00.000Z',
    version: 1,
    chanel: '',
    activityName: '',
    consentType: '',
    optIn: false,
  },
  {
    purposeID: '7f62dae3-f04c-4104-bf7e-fdaca2dd2b11',
    consentReceiptsID: '40645',
    dataSubject: 'ลูกค้า (ผู้เยาว์)',
    email: 'satit@gmail.com',
    status: 'waiting verify',
    collectionPoint: 'ROP Website',
    activityGroup: 'Commercial',
    purposeGroup: 'Commercial',
    duration: {
      day: '0',
      month: '0',
      year: '10',
    },
    expiryDate: '2029-12-31',
  },
  {
    purposeID: '2cb625a4-b70d-422e-9efd-a33704dfff3d',
    consentReceiptsID: '6874',
    dataSubject: 'ลูกค้า (บุคคลไร้ความสามารถ)',
    email: 'nopparat@gmail.com',
    status: 'active',
    collectionPoint: 'member.thaismileair',
    activityGroup: 'Commercial',
    purposeGroup: 'Commercial',
    duration: {
      day: '0',
      month: '0',
      year: '10',
    },
    expiryDate: '2029-12-31',
  },
  {
    purposeID: '9abc7efc-4a47-4ec0-96a7-584f2e260cbe',
    consentReceiptsID: '00344772',
    dataSubject: 'ผู้เข้าชม',
    email: 'Thitiwut@gmail.com',
    status: 'active',
    collectionPoint: 'thaismileair.com',
    activityGroup: 'Cookie Consent',
    purposeGroup: 'Cookie Consent',
    duration: {
      day: '0',
      month: '0',
      year: '10',
    },
    expiryDate: '2029-12-31',
  },
];

const purpose = {
  purposeID: '536a79f7-2449-4ba0-abf7-f42610413f8e',
  name: 'purpose 1',
  description:
    'ข้าพเจ้ายอมรับ กฎเกณฑ์และเงื่อนไข ของรายการสะสมไมล์ รอยัล ออร์คิด พลัส',
  displayType: '',
  displayTypeID: '',
  preferences: [
    {
      id: '',
      name: '',
      attributeTypeID: '',
      attributeType: '',
      choices: [''],
    },
  ],
  value: [''],
};

export const transaction = {
  list,
  purpose,
};
