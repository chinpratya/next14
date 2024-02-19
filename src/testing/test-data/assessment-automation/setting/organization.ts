import { v4 as uuid } from 'uuid';

const listOrganization = [
  {
    ObjectUUID: 'fff8364f-7b3f-4c06-ab37-45aa612613d5',
    name: `Organization-1`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '8fe25b08-0fe3-46f6-8424-0aa54516da26',
    name: `Organization-2`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '28af7b7c-f47c-48cb-a6e8-e6a053f8b80d',
    name: `Organization-3`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '31d0b550-f668-42ac-abe9-7c8fe3c50605',
    name: `Organization-4`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '093d1c44-b1c9-413e-b213-96362ec59348',
    name: `Organization-5`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '0d2ebcbc-9bc9-4bb0-9895-e62794309904',
    name: `Organization-6`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: 'f2397eb4-2554-47b2-8ca8-f35a91d957a4',
    name: `Organization-7`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '9cb97aeb-3022-4c12-a23a-a7c4cb56cc34',
    name: `Organization-8`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: '5c30b46d-dc85-4b1a-b1ec-35055188452e',
    name: `Organization-9`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: 'd1badfff-c66d-48e6-b7e1-7a7488b59d48',
    name: `Organization-10`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: 'cd65d4f9-3fec-4a54-a852-cd12fcb1aa09',
    name: `Organization-11`,
    orgGroup: [
      'หน่วยงานของรัฐรูปแบบใหม่',
      'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
    ],
    orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
    agency: 'test',
    industryGroup: 'เกษตรและอุตสาหกรรมอาหาร',
    industryGroupID: 'z1y3c-1w7fc1',
    businessCategory: 'ธุรกิจการเกษตร',
    businessCategoryID: 'x1z3s-1d7kc1',
    description: 'etc.',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
];

// Array.from(
//   { length: 12 },
//   (_, i) =>
//     ({
//       ...initialData,
//       ObjectUUID: uuid(),
//       name: `Organization-${i + 1}`,
//     } as typeof initialData)
// );

const metaComplianceOrg = {
  orgType: [
    {
      ObjectUUID: 'x1q3c-1w7fc1',
      label: 'ส่วนราชการ',
      children: [],
    },
    {
      ObjectUUID: 'x2q3c-2w7fc2',
      label: 'รัฐวิสาหกิจ',
      children: [],
    },
    {
      ObjectUUID: 'x3q3c-3w7fc3',
      label: 'องค์การมหาชน ',
      children: [],
    },
    {
      ObjectUUID: 'x4q3c-4w7fc4',
      label: 'หน่วยงานของรัฐรูปแบบใหม่',
      children: [
        {
          ObjectUUID: 'a4w3s-4q7kc4',
          label:
            'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
        },
        {
          ObjectUUID: 'b5w3s-5q7kc5',
          label: 'กองทุนที่เป็นนิติบุคคล',
        },
        {
          ObjectUUID: 'c6w3s-6q7kc6',
          label: 'หน่วยบริการรูปแบบพิเศษ',
        },
      ],
    },
  ],
  industryGroup_and_businessCategory: [
    {
      ObjectUUID: 'z1y3c-1w7fc1',
      label: 'เกษตรและอุตสาหกรรมอาหาร',
      children: [
        {
          ObjectUUID: 'x1z3s-1d7kc1',
          label: 'ธุรกิจการเกษตร',
        },
        {
          ObjectUUID: 'x2z3s-2q7kc2',
          label: 'อาหารและเครื่องดื่ม',
        },
      ],
    },
    {
      ObjectUUID: 'z2y3c-2w7fc2',
      label: 'สินค้าอุปโภคบริโภค ',
      children: [
        {
          ObjectUUID: 'x3z3s-3d7kc3',
          label: 'แฟชั่น',
        },
        {
          ObjectUUID: 'x4z3s-4q7kc4',
          label: 'ของใช้ในครัวเรือนและสำนักงาน',
        },
        {
          ObjectUUID: 'x5z3s-5q7kc5',
          label: 'ของใช้ส่วนตัวและเวชภัณฑ์',
        },
      ],
    },
    {
      ObjectUUID: 'z3y3c-3w7fc3',
      label: 'ธุรกิจการเงิน',
      children: [
        {
          ObjectUUID: 'x6z3s-6d7kc6',
          label: 'ธนาคาร',
        },
        {
          ObjectUUID: 'x7z3s-7q7kc7',
          label: 'เงินทุนและหลักทรัพย์',
        },
        {
          ObjectUUID: 'x8z3s-8q7kc8',
          label: 'ประกันภัยและประกันชีวิต',
        },
      ],
    },
    {
      ObjectUUID: 'z4y3c-4w7fc4',
      label: 'สินค้าอุตสาหกรรม ',
      children: [
        {
          ObjectUUID: 'x9z3s-9d7kc9',
          label: 'ยานยนต์',
        },
        {
          ObjectUUID: 'x0z3s-0q7kc0',
          label: 'วัสดุอุตสาหกรรมและเครื่องจักร',
        },
        {
          ObjectUUID: 'y1z3s-1q7kc1',
          label: 'บรรจุภัณฑ์ ',
        },
        {
          ObjectUUID: 'y2z3s-2q7kc2',
          label: 'กระดาษและวัสดุการพิมพ์',
        },
        {
          ObjectUUID: 'y3z3s-3q7kc3',
          label: 'ปิโตรเคมีและเคมีภัณฑ์',
        },
        {
          ObjectUUID: 'y4z3s-4q7kc4',
          label: 'เหล็ก และ ผลิตภัณฑ์โลหะ',
        },
      ],
    },
  ],
};

const initialDataContact = {
  department: 'บริหาร',
  position: 'ผู้บริหารระดับสูง',
  tel: '098-888-8888',
  email: 'email@email.com',
  organizationID: '92c5f343-17c6-4736-9e9d-baadb89fb2a5',
  createdDt: '2023-04-11 13:00',
  createdBy: 'admin',
  updatedDt: '2023-04-11 13:00',
  updatedBy: 'admin',
  description: '',
};

const listOrganizationContact = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      ...initialDataContact,
      ObjectUUID: uuid(),
      name: `Contact  ${i + 1}`,
    } as typeof initialDataContact)
);

const initialDataInstitute = {
  province: 'กรุงเทพมหานคร',
  district: 'เขตพระนคร',
  createdDt: '2023-04-18 10:00',
  createdBy: 'admin',
  updatedDt: '2023-04-18 10:00',
  updatedBy: 'admin',
  description: 'etc.',
};

const listOrganizationInstitute = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      ...initialDataInstitute,
      ObjectUUID: uuid(),
      name: `Institute  ${i + 1}`,
    } as typeof initialDataInstitute)
);

const initialDataInstituteRespondent = {
  organizationName: 'บริษัท ซีเคียวริตี้ พิทซ์ จำกัด.',
  branchName: 'บริหาร',
  position: 'ผู้บริหาร',
  approverName: '',
  approverEmail: '',
  email: 'admin@gmail.com',
  tel: '098-888-8888',
};

const listOrganizationInstituteRespondent = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      ...initialDataInstituteRespondent,
      ObjectUUID: `AP-${i}`,
      name: `Respondent  ${i + 1}`,
    } as typeof initialDataInstituteRespondent)
);

const listOrganizationInstituteApproverRespondent =
  Array.from({ length: 5 }, (_, i) => `AP-${i}`);

const listOrganizationInstituteApproverRespondentOption =
  Array.from({ length: 5 }, (_, i) => ({
    name: `AP-${i}`,
    key: `${i}`,
    position: 'ผู้บริหาร',
  }));

const initialDataInstituteApprover = {
  organization: 'บริษัท ซีเคียวริตี้ พิทซ์ จำกัด.',
  department: 'บริหาร',
  position: 'ผู้บริหาร',
  email: 'admin1@gmail.com',
  tel: '098-888-8888',
  respondent: listOrganizationInstituteApproverRespondent,
};

const listOrganizationInstituteApprover = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      ...initialDataInstituteApprover,
      ObjectUUID: uuid(),
      name: `Approver  ${i + 1}`,
    } as typeof initialDataInstituteApprover)
);

const initialDataInstituteAssignment = {
  assessmentName: 'แบบสำรวจระดับความพร้อม',
  type: 'ความพร้อม',
  no: '1',
  assignmentDt: '2023-04-20 10:00',
  expireDt: '2023-04-21 10:00',
  respondentCount: 1,
  respondentTotal: 2,
};

const listOrganizationInstituteAssignment = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      ...initialDataInstituteAssignment,
      ObjectUUID: uuid(),
      name: `Assignment  ${i + 1}`,
    } as typeof initialDataInstituteAssignment)
);

const initialDataInstituteAssignmentRespondent = {
  respondentName: 'แบบสำรวจระดับความพร้อม',
  email: 'admin@email.com',
  department: 'บริหาร',
  position: 'ผู้บริหาร',
  status: 'ประเมินเสร็จสิ้น',
  assignmentDt: '2023-04-20 11:00',
  complateDt: '2023-04-21 11:00',
};

const listOrganizationInstituteAssignmentRespondent =
  Array.from(
    { length: 12 },
    (_, i) =>
      ({
        ...initialDataInstituteAssignmentRespondent,
        ObjectUUID: uuid(),
        name: `Assessors  ${i + 1}`,
      } as typeof initialDataInstituteAssignmentRespondent)
  );

const listOrganizationInstituteAssignmentGrowth = [
  {
    ObjectUUID: '001',
    graph: [
      {
        key: '001',
        label: 'SP',
        data: ['40', '50'],
        detail: [
          {
            orgName: 'ซิเคียวริตี้พิทช์ จำกัด',
            rank: '70',
            totalRank: '100',
            maturityModel: 'Defined',
          },
          {
            orgName: 'ซิเคียวริตี้พิทช์ จำกัด',
            rank: '80',
            totalRank: '100',
            maturityModel: 'Defined',
          },
        ],
      },
    ],
    meta: [
      {
        key: 'M01',
        value: 'มกราคม 66',
      },
      {
        key: 'M02',
        value: 'เมษายน 66',
      },
    ],
  },
];

export const organization = {
  list: listOrganization,
  metaOrg: metaComplianceOrg,
  listContact: listOrganizationContact,
  listInstitute: listOrganizationInstitute,
  listInstituteRespondent:
    listOrganizationInstituteRespondent,
  listInstituteApprover:
    listOrganizationInstituteApprover,
  listInstituteAssignment:
    listOrganizationInstituteAssignment,
  listInstituteApproverRespondent:
    listOrganizationInstituteApproverRespondent,
  listInstituteApproverRespondentOption:
    listOrganizationInstituteApproverRespondentOption,
  listInstituteAssignmentRespondent:
    listOrganizationInstituteAssignmentRespondent,
  listInstituteAssignmentGrowth:
    listOrganizationInstituteAssignmentGrowth,
};
