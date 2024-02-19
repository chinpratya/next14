export const list = [
  {
    purposeID: '64d69166-a0db-4e31-95eb-74fe3df84e76',
    name: 'สนับสนุนการสมัครรายเดือน',
    lawBasis: 'ฐานกฎหมาย (Contract)',
    dataCategories: [
      {
        dataCategoryID:
          '526dd925-2698-4a72-b13d-73eb9033fa78',
        name: 'ข้อมูลสำหรับติดต่อสื่อสาร',
        classificationID: '',
        classificationName: '',
      },
      {
        dataCategoryID:
          '30dfdbea-710a-44ca-9845-b98979b94bb0',
        name: 'ข้อมูลสำหรับติดต่อสื่อสาร',
        classificationID: '',
        classificationName: '',
      },
    ],
    dataElements: [
      {
        dataElementID: '213123',
        name: 'ชื่อ',
        classificationID: '1',
        classificationName: 'ข้อมูลทั่วไป',
      },
      {
        dataElementID: '213124',
        name: 'นามสกุล',
        classificationID: '1',
        classificationName: 'ข้อมูลทั่วไป',
      },
      {
        dataElementID: '213125',
        name: 'ชื่อ-นามสกุล',
        classificationID: '2',
        classificationName: 'ข้อมูลส่วนบุคคล',
      },
    ],
    chanel: 'ROP Member',
    assetType: ['อิเล็กทรอนิกส์'],
    isDataUsagePeriod: true,
    dataUsagePeriod: {
      day: 90,
      month: 3,
      year: 0,
      description: '-',
    },
    isDataRetentionPeriod: true,
    dataRetentionPeriod: {
      day: 90,
      month: 3,
      year: 0,
      description: '-',
    },
    storage: 'AWS',
    dataRetentionMethod: '-',
    rightsAndMethodAccessPersonalInformation: '90 วัน',
    source: 'เจ้าของข้อมูล',
    methodRemoveWhenExpire: '',
  },
];

const destination = [
  {
    destinationID: 'ea2996a3-d9ef-461a-bfb3-d3d997db00b6',
    actorID: '',
    name: 'Pex',
    email: 'pex@gmail.com',
    tel: '0870363894',
    address: 'ROP Member',
    country: 'พม่า',
    url: '',
    personalType: 'DC',
    actorType: 'บุคคล',
    tranferType: ['public', 'transfer'],
    legalPDPA: '89910e3a-04f3-4ca8-a200-206c8ae40606',
    isDPA: false,
    dpaUrl: '',
    isPDSA: false,
    pdsaUrl: '',
    tranferMethod: '',
    personalProtectionMeasures: '',
  },
  {
    destinationID: '04b5afde-9b58-4dbc-9039-94ce02dbe902',
    actorID: '',
    name: 'Pex',
    email: 'pex@gmail.com',
    tel: '0870363894',
    address: 'ROP Member',
    country: 'พม่า',
    url: '',
    personalType: 'DC',
    actorType: 'บุคคล',
    tranferType: ['public'],
    legalPDPA: '860056f5-0f0b-4b22-89f6-7200f66294f0',
    isDPA: false,
    dpaUrl: '',
    isPDSA: false,
    pdsaUrl: '',
    tranferMethod: '',
    personalProtectionMeasures: '',
  },
];

export const purpose = {
  list,
  destination,
};
