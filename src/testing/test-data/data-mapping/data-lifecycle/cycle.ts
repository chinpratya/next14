const detail = {
  dataSubject: [
    {
      ObjectUUID: '81f1cd7c-91e3-4bbf-85b8-158f37eb4556',
      name: 'เจ้าของข้อมูล',
      refObjectUUID: [
        '02280563-7c91-4797-9fa5-dbbe6d609808',
      ],
    },
  ],
  collect: [
    {
      ObjectUUID: '02280563-7c91-4797-9fa5-dbbe6d609808',
      name: 'onefence',
      refObjectUUID: [
        'e5619db0-92c4-4aff-b8a6-a18f339ff4c4',
      ],
    },
  ],
  dataset: [
    {
      ObjectUUID: 'e5619db0-92c4-4aff-b8a6-a18f339ff4c4',
      name: 'ข้อมูลลูกค้า',
      refObjectUUID: [
        '4b3e5249-8e89-437e-a708-9823476d5ea7',
      ],
    },
  ],
  storage: [
    {
      ObjectUUID: '4b3e5249-8e89-437e-a708-9823476d5ea7',
      name: 'AWS',
      refObjectUUID: [
        '88c96f1c-5029-432e-94c3-0e216c070c6d',
      ],
    },
  ],
  rights: [
    {
      ObjectUUID: '88c96f1c-5029-432e-94c3-0e216c070c6d',
      name: 'rights',
      refObjectUUID: [
        '74b74468-d85b-4ddd-8882-e42706a68eba',
        '44232c2a-8f50-4168-b680-9677d5623422',
      ],
    },
  ],
  process: [
    {
      ObjectUUID: '74b74468-d85b-4ddd-8882-e42706a68eba',
      name: 'วัตถุประสงค์=ใช้,เผยแพร่',
      refObjectUUID: [
        '68ff3d5e-34eb-4797-be75-ad7d8bd90b04',
      ],
    },
    {
      ObjectUUID: '44232c2a-8f50-4168-b680-9677d5623422',
      name: 'วัตถุประสงค์=ใช้,เผยแพร่',
      refObjectUUID: [
        '7738c086-7d68-4ac5-9a96-6e8e4d67ab48',
      ],
    },
  ],
  tranfer: [
    {
      ObjectUUID: '7738c086-7d68-4ac5-9a96-6e8e4d67ab48',
      name: 'Asset ปลายทาง',
      refObjectUUID: [],
    },
  ],
  destroy: [
    {
      ObjectUUID: '68ff3d5e-34eb-4797-be75-ad7d8bd90b04',
      name: 'destroy',
      refObjectUUID: [],
    },
  ],
};

const data = {
  collect: [
    {
      ObjectUUID: '02280563-7c91-4797-9fa5-dbbe6d609808',
      name: 'onefence',
      group: '-',
      country: 'TH',
      address:
        '185 Village 8 , Subdistrict Pakchog , District Lomsuk',
      owner: 'Nattapon Rattanaporn',
    },
  ],
  dataset: [
    {
      ObjectUUID: 'e5619db0-92c4-4aff-b8a6-a18f339ff4c4',
      name: 'ข้อมูลลูกค้า',
      group: 'ROP Service',
      categoryClassification: [
        'ข้อมูลทั่วไป',
        'ข้อมูลส่วนบุคคล',
      ],
      dataElements: [
        {
          dataElementID: '1',
          name: 'ชื่อ-นามสกุล',
          classification: 'ข้อมูลทั่วไป',
        },
        {
          dataElementID: '2',
          name: 'ชื่อ-นามสกุล',
          classification: 'ข้อมูลส่วนบุคคล',
        },
      ],
    },
  ],
  rights: [
    {
      ObjectUUID: '88c96f1c-5029-432e-94c3-0e216c070c6d',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nisl nisl ultricies nisl, eget ultricies nisl nisl eget.',
    },
  ],
  storage: [
    {
      ObjectUUID: '4b3e5249-8e89-437e-a708-9823476d5ea7',
      name: 'AWS',
      group: 'AWS',
      country: 'TH',
      address:
        '185 Village 8 , Subdistrict Pakchog , District Lomsuk',
      owner: 'Nattapon Rattanaporn',
    },
  ],
  process: [
    {
      ObjectUUID: '74b74468-d85b-4ddd-8882-e42706a68eba',
      name: 'สนับสนุนการสมัครรายเดือน',
      group: 'Marketing',
      legalBasis: 'ฐานปฏิบัติตามสัญญา (การเข้าใช้บริการ)',
      isDataUsagePeriod: '30 วัน',
      dataUsagePeriod: {
        day: 30,
        month: 0,
        year: 0,
        description: '',
      },
      tranferType: ['เปิดเผย', 'โอนข้อมูล'],
    },
    {
      ObjectUUID: '44232c2a-8f50-4168-b680-9677d5623422',
      name: 'สนับสนุนการสมัครรายเดือน',
      group: 'Marketing',
      legalBasis: 'ฐานปฏิบัติตามสัญญา (การเข้าใช้บริการ)',
      isDataUsagePeriod: '30 วัน',
      dataUsagePeriod: {
        day: 30,
        month: 0,
        year: 0,
        description: '',
      },
      tranferType: ['เปิดเผย', 'โอนข้อมูล'],
    },
  ],
  tranfer: [
    {
      ObjectUUID: '7738c086-7d68-4ac5-9a96-6e8e4d67ab48',
      name: 'Rop Member',
      group: 'Webapp',
      country: 'TH',
      address:
        '185 Village 8 , Subdistrict Pakchog , District Lomsuk',
      owner: 'Nattapon Rattanaporn',
      dataset: 'ข้อมูลลูกค้า',
    },
  ],
  dataDestruction: [
    {
      ObjectUUID: '68ff3d5e-34eb-4797-be75-ad7d8bd90b04',
      description:
        'ทางองค์กรมีการทำลายข้อมูลตามหลักมาตรฐานสากล NIST \n' +
        'SP 800-88 Guidelines for Media Sanitization ซึ่งวิธีการที่องค์กรเลือก\n' +
        'ที่จะทำลายข้อมูลนั้นจะขึ้นอยู่กับระดับการรักษาความลับของข้อมูลนั้น ๆ',
    },
  ],
};

export const cycle = {
  detail,
  data,
};
