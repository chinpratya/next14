const list = [
  {
    ObjectUUID: '5e56190c-5eec-485d-9060-83c2e545c4cf',
    purposeID: 'decba493-faa0-4d09-af46-e3f55fba3d7f',
    basisID: 'bd6ba36d-a5f7-433f-b8d7-70d24a9c32c5',
    name: 'OneFence1',
    group: 'ROP Service',
    dataUsagePeriod: {
      day: '30',
      month: '0',
      year: '0',
      description: '',
    },
    description: '',
    fileID: '',
    fileUrl: '',
  },
];

const dataCategory = [
  {
    ObjectUUID: 'fc85e81a-bbae-4df1-b875-fa1708b75662',
    basisID: 'bd6ba36d-a5f7-433f-b8d7-70d24a9c32c5',
    purposeID: 'decba493-faa0-4d09-af46-e3f55fba3d7f',
    dataCategoryID:
      '526dd925-2698-4a72-b13d-73eb9033fa78',
    name: 'ข้อมูลสำหรับติดต่อสื่อสาร',
    dataElements: [
      {
        dataElementID: '213123',
        name: 'ชื่อ',
        classificationID:
          'e13f9128-f3f9-4979-b4e5-343ad956b634',
        classificationName: 'ข้อมูลทั่วไป',
      },
    ],
  },
];

export const purpose = {
  list,
  dataCategory,
};
