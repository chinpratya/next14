const list = [
  {
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
    dataElementID: '213124',
    name: 'นามสกุล',
    dataClassificationID: '1',
    dataClassification: 'ข้อมูลทั่วไป',
    organization: 'SP',
    created_by: 'System',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'System',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
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
  {
    dataElementID: '213126',
    name: 'เบอร์',
    dataClassificationID: '2',
    dataClassification: 'ข้อมูลส่วนบุคคล',
    organization: 'SP',
    created_by: 'System',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'System',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    dataElementID: '213127',
    name: 'ศาสนา',
    dataClassificationID: '3',
    dataClassification: 'ข้อมูลอ่อนไหว',
    organization: 'SP',
    created_by: 'System',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'System',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
];

const meta = [
  { ObjectUUID: '1', name: 'ข้อมูลทั่วไป' },
  { ObjectUUID: '2', name: 'ข้อมูลส่วนบุคคล' },
  { ObjectUUID: '3', name: 'ข้อมูลอ่อนไหว' },
];

export const elements = {
  list,
  meta,
};
