export const preview = {
  activityID: '3aacc747-04f5-43aa-933e-43ece2ce3b38',
  name: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
  dataController: {
    actorID: '37073a96-2861-4b31-9789-5a6bddc51eb5',
    name: 'นายนพเก้า เจริษราษ',
    address:
      '88, อินดิเพ็นเดนท์ คอมมิวนิเคชั่นเน็ทเวอร์ค ชั้น 6 อาคาร, 8 ซอย ลาดพร้าว 18 แยก 12 แขวงจอมพล จตุจักร, กรุงเทพมหานคร 10900',
    personalType: 'บุคคล',
    actorType: '',
    country: 'ไทย',
    email: ' noppakao.j@gamil.com',
    phone: '02-12412412',
  },
  dataProtectionOfficer: {
    actorID: 'f515b124-ce31-4d76-8cea-e6146175eed3',
    name: 'นายนพเก้า เจริษราษ',
    address:
      '88, อินดิเพ็นเดนท์ คอมมิวนิเคชั่นเน็ทเวอร์ค ชั้น 6 อาคาร, 8 ซอย ลาดพร้าว 18 แยก 12 แขวงจอมพล จตุจักร, กรุงเทพมหานคร 10900',
    personalType: 'บุคคล',
    actorType: '',
    country: 'ไทย',
    email: ' noppakao.j@gamil.com',
    phone: '02-12412412',
  },
  dataCategories: [
    {
      dataCategoriyID:
        '6f4ff073-3790-4b32-be95-44deae83293b',
      name: 'ข้อมูลลูกค้า / ผู้ใช้บริการ',
      categoryClassification: ['ข้อมูลทั่วไป'],
      dataGroup: [
        'ชื่อ-นามสกุล',
        'ที่อยู่',
        'เบอร์โทร',
        'อีเมล',
      ],
      dataSubject: ['ข้อมูลลูกค้า / ผู้ใช้บริการ'],
      purposes: [
        'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
        'เพื่อตรวจสอบการทุจริต',
      ],
    },
    {
      dataCategoriyID:
        '0d440fe2-ec91-4d2f-94c7-3d07f82aa154',
      name: 'ข้อมูลลูกค้า / ผู้ใช้บริการ',
      categoryClassification: ['ข้อมูลทั่วไป'],
      dataGroup: [
        'ข้อมูลจราจรคอมพิวเตอร์ตามกฎหมาย ได้แก่ ข้อมูลการติดต่อและสื่อสารกับคนอื่น  หมายเลข IP  ข้อมูลเครือข่ายมือถือ  ข้อมูลการเชื่อมต่อ  ข้อมูลตำแหน่งที่ตั้ง  บันทึกการเข้าออกเว็บไซต์ ประวัติการใช้เว็บไซต์ ความถี่ ช่วงเวลา  ข้อมูลการทำธุรกรรม  พฤติกรรมการใช้งาน ข้อมูลที่เก็บผ่านคุกกี้',
      ],
      dataSubject: ['ข้อมูลลูกค้า / ผู้ใช้บริการ'],
      purposes: [
        'การจัดเก็บข้อมูลจราจรคอมพิวเตอร์ในฐานะผู้ให้บริการ',
      ],
    },
  ],
  purposes: [
    {
      purposeID: '0e03b599-750d-4264-9924-4ed1cec56a52',
      name: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      dataRetention:
        'มีการใช้หรือเปิดเผยข้อมูลไปยังส่วนงานที่เกี่ยวข้องกับการดำเนินงานด้าน IT',
      legalBasis: 'ฐานปฏิบัติตามสัญญา (การเข้าใช้บริการ)',
      consent: {
        isConsent: false,
        exception: 'ป้องกันอัตรายต่อชีวิต',
      },
    },
    {
      purposeID: '639e23b1-4f19-4444-8cc7-5a33a732ac23',
      name: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      dataRetention:
        'มีการใช้หรือเปิดเผยข้อมูลไปยังส่วนงานที่เกี่ยวข้องกับการดำเนินงานด้านกฎหมายหรือฝ่ายตรวจสอบ',
      legalBasis: 'ฐานประโยชน์โดยชอบด้วยกฎหมาย',
      consent: {
        isConsent: true,
        exception: '',
      },
    },
  ],
  isTranfer: true,
  tranferData: [
    {
      purpose: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      position: 'DP',
      country: 'พม่า',
      isCompanyGroup: false,
      destCountry: 'นิติบุคคล',
      destName: 'บริษัท A',
      tranferMethod: 'อิเล็กทรอนิกส์',
      personalDataProtectionMeasures: 'ต่ำกว่าไทย',
      fileUrl: 'agreement.pdf',
    },
    {
      purpose: 'เพื่อตรวจสอบการทุจริต',
      position: 'DP',
      country: 'พม่า',
      isCompanyGroup: false,
      destCountry: 'นิติบุคคล',
      destName: 'บริษัท A',
      tranferMethod: 'อิเล็กทรอนิกส์',
      personalDataProtectionMeasures: 'ต่ำกว่าไทย',
      fileUrl: 'agreement.pdf',
    },
    {
      purpose:
        'การจัดเก็บข้อมูลจราจร คอมพิวเตอร์ในฐานะผู้ให้บริการ',
      position: 'DP',
      country: 'พม่า',
      isCompanyGroup: false,
      destCountry: 'นิติบุคคล',
      destName: 'บริษัท A',
      tranferMethod: 'อิเล็กทรอนิกส์',
      personalDataProtectionMeasures: 'ต่ำกว่าไทย',
      fileUrl: 'agreement.pdf',
    },
  ],
  privacyPolicy: {
    storage: [
      {
        id: 'd2e24d65-d2e2-475b-9d46-fd308afed62e',
        name: 'AWS',
        purposes: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      },
      {
        id: '953c9354-2e36-466d-b752-dc227fe1278f',
        name: 'Google drive',
        purposes:
          'การจัดเก็บข้อมูลจราจรคอมพิวเตอร์ในฐานะผู้ให้บริการ',
      },
    ],
    storageType: [
      {
        id: '0b3ea58e-b798-4130-bb3b-68401b12407d',
        name: 'ข้อมูลอิเล็กทรอนิกส์',
        purposes: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      },
    ],
    dataRetentionMethod: [
      {
        id: '64e58e8f-0547-4370-a084-c88f143067f5',
        name: 'เข้ารหัส',
        purposes: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      },
    ],
    rightsAccessPersonalData: [
      {
        id: '211dc3eb-bab2-422b-b358-ba05b2f11ef7',
        name: 'กำหนดเฉพาะผู้มีสิทธิ / ฝ่าย IT',
        purposes: 'เพื่อยืนยันตัวตนในการเข้าใช้บริการ',
      },
    ],
    removeOrDelete: [
      {
        id: 'b26f262b-658b-4f6e-967b-60ee856889c3',
        name: '',
        purposes: '',
      },
    ],
    securityMeasuresUnderSection37: [
      {
        id: 'fb88cd53-4a9f-4f35-b897-01da63e5b95e',
        name: '',
        management: '',
        technical: '',
        physical: '',
      },
    ],
    rightsOfPersonalData: [
      {
        id: 'e8b1e570-af00-4379-9bab-6ee745e5c13d',
        name: 'สิทธิได้รับการแจ้งให้ทราบ',
        isGrant: true,
      },
      {
        id: '8bf0e29c-4e56-4486-ad95-8f8c3948a916',
        name: 'สิทธิขอเข้าถึงข้อมูลส่วนบุคคล',
        isGrant: true,
      },
      {
        id: '1949db16-5b38-4c2d-81b5-5aba9f512558',
        name: 'สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล',
        isGrant: true,
      },
      {
        id: '6a1cd2d7-d719-4863-9fad-b63baf93b38f',
        name: 'สิทธิขอให้ลบหรือทำลาย',
        isGrant: false,
      },
      {
        id: '630bd705-f027-4072-af03-27cf022014bc',
        name: 'สิทธิในการเพิกถอนความยินยอม',
        isGrant: true,
      },
      {
        id: 'b061f2ab-83bd-46d5-8536-ac3cd27d1c00',
        name: 'สิทธิในการขอให้แก้ไขข้อมูลส่วนบุคคล',
        isGrant: true,
      },
      {
        id: 'be4e1d63-860f-4ea0-97c3-1308275b2a3b',
        name: 'สิทธิในการขอให้โอนข้อมูลส่วนบุคคล',
        isGrant: true,
      },
    ],
  },
};
