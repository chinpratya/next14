import { faker } from '@faker-js/faker';

import { uid } from '@/utils';

const initialData = {
  assessmentName: 'แบบสำรวจความพร้อมของPDPA',
  group: 'ความพร้อม',
  org: {
    count: 5,
    total: 15,
  },
  respondent: {
    count: 5,
    total: 20,
  },
  dueDate: '2023-04-30 10:00',
  sendBy: 'admin',
  createdDt: '2023-04-27 10:00',
  createdBy: 'admin',
  updatedDt: '2023-04-27 10:00',
  updatedBy: 'admin',
};

const listAssessmentSubmission = [
  {
    ObjectUUID: '29b1757e-e57f-4286-b4a8-73e2b1d4543c',
    name: `Assessment-1`,
    assessmentID: 'Assessment-1',
    status: 'success',
    ...initialData,
  },
  {
    ObjectUUID: '5facd6fb-d447-49a9-a0d2-d4225b7d7d26',
    name: `Assessment-2`,
    assessmentID: 'Assessment-2',
    status: 'draft',
    ...initialData,
  },
  {
    ObjectUUID: '5286f02d-2d19-459c-8096-86d1d8dd52a1',
    name: `Assessment-3`,
    assessmentID: 'Assessment-3',
    status: 'waiting_send',
    ...initialData,
  },
];

const assessmentSubmissionInfo = {
  ObjectUUID: '29b1757e-e57f-4286-b4a8-73e2b1d4543c',
  name: `Assessment-1`,
  assessmentID: 'Assessment-1',
  assessmentName: 'แบบสำรวจความพร้อมของPDPA',
  startDt: '2023-04-27 10:00',
  endDt: '2023-04-27 10:00',
  group: 'ความพร้อม',
  respondentCount: 1,
  status: 'success',
  createdDt: '2023-04-27 10:00',
  createdBy: 'admin',
  updatedDt: '2023-04-27 10:00',
  updatedBy: 'admin',
};

export const listAssessmentSubmissionAllRespondents = [
  {
    ObjectUUID: '11',
    name: 'Security Pitch',
    orgGroup: ['security'],
    industryGroup: 'security',
    businessCategory: 'security',
    branchs: [
      {
        ObjectUUID: uid(),
        name: 'สำนักงานใหญ่',
        respondents: [
          {
            ObjectUUID: uid(),
            name: 'นายนพรัตน์ ตำทิพย์',
            department: 'ผู้บริหาร',
            position: 'ผู้บริหารระดับสูง',
            email: 'nopparat.k@gmail.com',
            tel: faker.phone.number(),
            haveApprover: true,
            approverID: '1',
            approverName: 'admin',
          },
          {
            ObjectUUID: uid(),
            name: 'นายธนนชัย พาลิวงษ์',
            department: 'ผู้บริหาร',
            position: 'ผู้บริหารระดับสูงสุด',
            email: 'thanonchai.p@gmail.com',
            tel: faker.phone.number(),
            haveApprover: true,
            approverID: '2',
            approverName: 'admin',
          },
        ],
        approvers: [
          {
            ObjectUUID: uid(),
            name: 'admin',
            department: 'admin',
            position: 'admin',
            email: 'admin@gmail.com',
            tel: faker.phone.number(),
          },
        ],
      },
    ],
  },
  {
    ObjectUUID: '12',
    name: 'Security Pitch2',
    orgGroup: ['security'],
    industryGroup: 'security',
    businessCategory: 'security',
    branchs: [
      {
        ObjectUUID: uid(),
        name: 'สำนักงานใหญ่',
        respondents: [
          {
            ObjectUUID: uid(),
            name: 'นายนพรัตน์ ตำทิพย์',
            department: 'ผู้บริหาร',
            position: 'ผู้บริหารระดับสูง',
            email: 'nopparat.k@gmail.com',
            tel: faker.phone.number(),
            haveApprover: true,
            approverID: '1',
            approverName: 'admin',
          },
          {
            ObjectUUID: uid(),
            name: 'นายธนนชัย พาลิวงษ์',
            department: 'ผู้บริหาร',
            position: 'ผู้บริหารระดับสูงสุด',
            email: 'thanonchai.p@gmail.com',
            tel: faker.phone.number(),
            haveApprover: true,
            approverID: '2',
            approverName: 'admin',
          },
        ],
        approvers: [
          {
            ObjectUUID: uid(),
            name: 'admin',
            department: 'admin',
            position: 'admin',
            email: 'admin@gmail.com',
            tel: faker.phone.number(),
          },
        ],
      },
    ],
  },
];

const listAssessmentSubmissionRespondent = [
  {
    ObjectUUID: '333sssssuf70eows0bjtklt',
    name: 'Assessment-1',
    email: 'Nopparat.k@gmail.com',
    approverID: 'e53ccec9-2387-44b0-8f0c-5c32fe3b6d53',
    approverName: 'Nopparat',
    status: 'reject',
    dueDate: '2023-05-06 12:00',
    orgID: '11',
    orgName: 'Security Pitch',
    isExtendTime: false,
    startDt: '2023-05-04 12:00',
    endDt: '2023-05-05 12:00',
    sendDt: '2023-05-04 12:00',
    submitDt: '2023-05-04 12:00',
    reasons: [
      {
        name: 'Name',
        email: 'thanonchai@gmail.com',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere hendrerit est vel ultricies. Sed pulvinar nulla quis magna mollis, quis condimentum nibh interdum. Vivamus lectus justo, suscipit in metus viverra, tempor commodo lorem. Morbi nulla sapien, ultricies sodales lorem id, fermentum mollis diam. Integer et ex leo.',
        action: 'extend_time',
        createdDt: 'createdDt',
      },
      {
        name: 'Name',
        email: 'thanonchai@gmail.com',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere hendrerit est vel ultricies. Sed pulvinar nulla quis magna mollis, quis condimentum nibh interdum. Vivamus lectus justo, suscipit in metus viverra, tempor commodo lorem. Morbi nulla sapien, ultricies sodales lorem id, fermentum mollis diam. Integer et ex leo.',
        action: 'cancel',
        createdDt: 'createdDt',
      },
    ],
  },
  {
    ObjectUUID: '2c3sssssuf70eows0bjtklt',
    name: `Assessment-2`,
    email: 'Thitwut.k@gmail.com',
    approverID: 'e53ccec9-2387-44b0-8f0c-5c32fe3b6d53',
    approverName: 'Thitwut',
    status: 'approve',
    dueDate: '2023-05-06 12:00',
    orgID: '12',
    orgName: 'Security Pitch2',
    isExtendTime: false,
    startDt: '2023-05-04 12:00',
    endDt: '2023-05-05 12:00',
    sendDt: '2023-05-04 12:00',
    submitDt: '2023-05-04 12:00',
    reasons: [
      {
        name: 'Name',
        email: 'thanonchai@gmail.com',
        message: 'test',
        action: 'cancel',
        createdDt: 'createdDt',
      },
    ],
  },
];

const listAssessmentSubmissionRespondentLog = [
  {
    ObjectUUID: '11',
    message: 'Log-1',
    createdDt: '2023-05-04 12:00',
    createdBy: 'Admin',
  },
  {
    ObjectUUID: '12',
    message: 'Log-2',
    createdDt: '2023-05-04 12:00',
    createdBy: 'Admin',
  },
];

const assessmentSubmissionSetting = {
  ObjectUUID: '875be3b4-c812-4a71-be73-5e5a7a683d16',
  createdDt: '2023-07-14 13:55:43',
  createdBy: 'admin@gmail.com',
  updatedDt: '',
  data: {
    isSetDt: false,
    startDt: '',
    endDt: '',
    isNotification: false,
    notifications: [],
    isSchedule: false,
    scheduleDt: '',
  },
};

export const metaId = [
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
  uid(),
];

const rankingInstitute = [
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สำนักงานใหญ่',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพญาไท',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพระนคร',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาลาดพร้าว',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาบางแค',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาพยุหะคีรี',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด / สาขาหล่มเก่า',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาเขาค้อ',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาสรรพยา',
  'บริษัท ซีเคียวริตี้ พิทช์ จำกัด /สาขาเมืองชัยนาท',
];

const rankingSections = [
  'ส่วนที่ 1',
  'ส่วนที่ 2',
  'ส่วนที่ 3',
  'ส่วนที่ 4',
  'ส่วนที่ 5',
  'ส่วนที่ 6',
];

export const rankingMeta = () => {
  return rankingSections.map((name, index) => ({
    key: metaId[index],
    value: name,
  }));
};

const meta = rankingMeta();

export const rankingScore = () => {
  return rankingInstitute.map((name) => {
    const score = [] as number[];

    meta.forEach((item, index) => {
      score[index] = Math.floor(Math.random() * 65) + 35;
    });

    return {
      key: uid(),
      name,
      [meta[0].key]: score[0],
      [meta[1].key]: score[1],
      [meta[2].key]: score[2],
      [meta[3].key]: score[3],
      [meta[4].key]: score[4],
      [meta[5].key]: score[5],
      avg:
        score.reduce((a, b) => a + b, 0) / score.length,
    };
  });
};

const scores = rankingScore();
const rankingScoreHorizontal = () => {
  const score = {
    key: uid(),
    name: 'ค่าเฉลี่ย',
    avg: 0,
  } as {
    key: string;
    name: string;
    avg: number;
    [key: string]: number | string;
  };

  meta.forEach((item) => {
    const key = item.key;
    const values = scores.map(
      (item) => item[key]
    ) as number[];
    score[key] =
      values.reduce((a, b) => a + b, 0) / values.length;
    score.avg =
      values.reduce((a, b) => a + b, 0) / values.length;
  });

  return score;
};

export const ranking = {
  code: 200,
  message: 'success',
  data: {
    scores,
    avgHorizontal: rankingScoreHorizontal(),
  },
  meta,
};

const keys = [uid(), uid(), uid(), uid(), uid(), uid()];

const graph = [
  {
    key: uid(),
    name: 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด',
    [keys[0]]: 88.6,
    [keys[1]]: 84.3,
    [keys[2]]: 67.6,
    [keys[3]]: 78.6,
    [keys[4]]: 78.6,
    [keys[5]]: 78.6,
  },
  {
    key: uid(),
    name: 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด2',
    [keys[0]]: 82.6,
    [keys[1]]: 44.3,
    [keys[2]]: 57.6,
    [keys[3]]: 38.6,
    [keys[4]]: 48.6,
    [keys[5]]: 38.6,
  },
  {
    key: uid(),
    name: 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด3',
    [keys[0]]: 80.6,
    [keys[1]]: 89.3,
    [keys[2]]: 57.6,
    [keys[3]]: 58.6,
    [keys[4]]: 98.6,
    [keys[5]]: 38.6,
  },
];

const graphMeta = [
  {
    key: keys[0],
    name: 'ส่วนที่ 1',
  },
  {
    key: keys[1],
    name: 'ส่วนที่ 2',
  },
  {
    key: keys[2],
    name: 'ส่วนที่ 3',
  },
  {
    key: keys[3],
    name: 'ส่วนที่ 4',
  },
  {
    key: keys[4],
    name: 'ส่วนที่ 5',
  },
  {
    key: keys[5],
    name: 'ส่วนที่ 6',
  },
];

const table = [
  {
    ObjectUUID: uid(),
    label: '1P',
    name: 'หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
    maxScore: 100,
    score: 86.67,
    percent: 86.67,
    maturityModelLV: 'Defined',
    child: [
      {
        ObjectUUID: uid(),
        label: '1a',
        name: '1.1 หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
        maxScore: 9,
        score: 7.8,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '2a',
        name: '1.2 หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
        maxScore: 9,
        score: 7.8,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '3a',
        name: '1.3  หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
        maxScore: 9,
        score: 7.8,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '4a',
        name: '1.4 หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
        maxScore: 7,
        score: 6.06,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '5a',
        name: '1.4 CIO รพ.ของ ท่านได้เข้าร่วมสัมมนา หรือประชุม ทั้งในและต่างประเทศ',
        maxScore: 9,
        score: 7.8,
        percent: 0,
        maturityModelLV: '',
      },
    ],
  },
  {
    ObjectUUID: uid(),
    label: '2P',
    name: 'หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
    maxScore: 100,
    score: 88.91,
    percent: 88.91,
    maturityModelLV: 'Defined',
    child: [
      {
        ObjectUUID: uid(),
        label: '1b',
        name: '2.1 โรงพยาบาลของท่าน มีการจัดทำแผนแม่บทเทคโนโลยีสารสนเทศ ที่ได้มาตรฐานสอดคล้องกับแผนยุทธศาสตร์ของโรงพยาบาล หรือไม่',
        maxScore: 20,
        score: 17.78,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '2b',
        name: '2.2 โรงพยาบาลของท่าน มีแผนปฏิบัติการ 1-3 ปี และมีการสื่อสารแผนไปสู่ผู้ที่เกี่ยวข้อง เพื่อรองรับการก้าวไปสู่รัฐบาลดิจิทัลของประเทศไทยหรือไม่่',
        maxScore: 20,
        score: 17.78,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '3b',
        name: '2.3 โรงพยาบาลของท่าน มีนโยบายและแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศของโรงพยาบาลหรือไม่',
        maxScore: 20,
        score: 17.78,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '4b',
        name: '2.4 โรงพยาบาลของท่าน มีแผนระยะยาวหรือไม่',
        maxScore: 20,
        score: 17.78,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '5b',
        name: '2.5 เมื่อดำเนินการตามแผนการปฏิบัติด้านเทคโนโลยีสารสนเทศแล้วมีการประเมินผลและดำเนินการปรับแผนในปีถัดไปหรือไม่',
        maxScore: 20,
        score: 17.78,
        percent: 0,
        maturityModelLV: '',
      },
    ],
  },
  {
    ObjectUUID: uid(),
    label: '3P',
    name: 'หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...หน่วยงานของท่าน มีการจัดทำแผน...',
    maxScore: 100,
    score: 67.6,
    percent: 67.6,
    maturityModelLV: 'Defined',
    child: [
      {
        ObjectUUID: uid(),
        label: '1c',
        name: '3.1 โรงพยาบาลของท่านเคยผ่านการประเมินมาตรฐานที่เกี่ยวข้องกับระบบเทคโนโลยีดิจิทัล ดังต่อไปนี้บ้าง (ตอบได้มากกว่า 1 ข้อ)',
        maxScore: 10,
        score: 6.76,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '2c',
        name: '3.2 โรงพยาบาลของท่าน มีกระบวนการประเมินและให้คะแนนความเสี่ยงของระบบสารสนเทศอย่างเป็นระบบโดยการมีส่วนร่วมของทุกฝ่าย',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '3c',
        name: '3.3 โรงพยาบาลของท่าน มีการดำเนินการตามแผนจัดการความเสี่ยง',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '4c',
        name: '3.4 โรงพยาบาลของท่าน มีการติดตาม ประเมินผลการดำเนินการจัดการความเสี่ยง และวิเคราะห์ผลการประเมินจัดทำเป็นรายงาน',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '5c',
        name: '3.5 โรงพยาบาลของท่าน มีการนำผลการประเมินการดำเนินการจัดการความเสี่ยงมาปรับแผนการจัดการความเสี่ยงให้ดีขึ้น',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '6c',
        name: '3.6 โรงพยาบาลของท่าน มีการจัดทำนโยบายและระเบียบปฏิบัติด้านความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศหรือไม่',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '7c',
        name: '3.7 โรงพยาบาลของท่าน มีนโยบายและระเบียบปฏิบัติที่อนุญาตให้เฉพาะผู้ที่รับผิดชอบดูแลรักษาผู้ป่วยในช่วงเวลาปัจจุบันเท่านั้นที่จะเข้าถึงข้อมูลผู้ป่วยรายนั้นได้',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '8c',
        name: '3.8 โรงพยาบาลของท่าน มีนโยบายและระเบียบปฏิบัติที่ป้องกันความลับผู้ป่วยมิให้รั่วไหลทุกช่องทางรวมทั้งช่องทางSocial Media ทุกด้าน',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '9c',
        name: '3.9 โรงพยาบาลของท่าน มีการประชาสัมพันธ์นโยบายและระเบียบปฏิบัติให้บุคลากรทุกคนได้รับทราบ',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '10c',
        name: '3.10 โรงพยาบาลของท่าน มีการตรวจสอบว่าบุคลากรได้รับทราบ เข้าใจ ยอมรับ และปฏิบัติตามระเบียบปฏิบัติด้านความมั่นคงปลอดภัยอย่างเคร่งครัด',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
      {
        ObjectUUID: uid(),
        label: '11c',
        name: '3.11 โรงพยาบาลของท่าน มีการประเมินผลการปฏิบัติตามระเบียบปฏิบัติและนำผลการประเมินมาปรับกระบวนการบังคับใช้ระเบียบปฏิบัติต่อไป',
        maxScore: 9,
        score: 6.08,
        percent: 0,
        maturityModelLV: '',
      },
    ],
  },
];

const report = {
  graph: [
    {
      title: 'ค่าเฉลี่ยรวมทุกองค์กร',
      value: [
        {
          key: 'a7e01e30-3672-4193-b1cf-592eeb2417bf',
          value: 0,
          totalScore: 0,
          actualScore: 0,
          totalPercent: 100,
          actualPercent: 0,
        },
        {
          key: 'e089cbc1-178e-432b-bb2c-bcfdfd7a058a',
          value: 0,
          totalScore: 0,
          actualScore: 0,
          totalPercent: 100,
          actualPercent: 0,
        },
        {
          key: '3201f9b4-4097-4d05-8874-182d489d6ea4',
          value: 0,
          totalScore: 0,
          actualScore: 0,
          totalPercent: 100,
          actualPercent: 0,
        },
        {
          key: '97ced9a4-4b5b-40c7-8147-10a956a1d1d2',
          value: 37.5,
          totalScore: 0,
          actualScore: 6,
          totalPercent: 100,
          actualPercent: 37.5,
        },
        {
          key: '59cc5b5a-fb96-4b9b-b5e1-a89953c13945',
          value: 15.151515151515152,
          totalScore: 0,
          actualScore: 5,
          totalPercent: 100,
          actualPercent: 15.151515151515152,
        },
      ],
    },
  ],
  graphMeta: [
    {
      key: 'a7e01e30-3672-4193-b1cf-592eeb2417bf',
      name: '2. แผนแม่บทเทคโนโลยีสารสนเทศ',
    },
    {
      key: 'e089cbc1-178e-432b-bb2c-bcfdfd7a058a',
      name: '3. การจัดการความเสี่ยงในระบบเทคโนโลยีสารสนเทศ',
    },
    {
      key: '3201f9b4-4097-4d05-8874-182d489d6ea4',
      name: '4. การจัดการความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศ',
    },
    {
      key: '97ced9a4-4b5b-40c7-8147-10a956a1d1d2',
      name: '5. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
    },
    {
      key: '59cc5b5a-fb96-4b9b-b5e1-a89953c13945',
      name: '6. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
    },
  ],
  sections: [
    {
      ObjectUUID: '5f5f9d9e-1a95-421a-909e-cc1dea7dba7b',
      label: '1p',
      name: '1. ข้อมูลพื้นฐานของโรงพยาบาล',
      maxScore: 0,
      score: 0,
      percent: 0,
      maturityModelLV: 'Initial',
    },
    {
      ObjectUUID: 'a7e01e30-3672-4193-b1cf-592eeb2417bf',
      label: '2p',
      name: '2. แผนแม่บทเทคโนโลยีสารสนเทศ',
      maxScore: 6,
      score: 0,
      percent: 0,
      maturityModelLV: 'Initial',
    },
    {
      ObjectUUID: 'e089cbc1-178e-432b-bb2c-bcfdfd7a058a',
      label: '3p',
      name: '3. การจัดการความเสี่ยงในระบบเทคโนโลยีสารสนเทศ',
      maxScore: 17,
      score: 0,
      percent: 0,
      maturityModelLV: 'Initial',
    },
    {
      ObjectUUID: '3201f9b4-4097-4d05-8874-182d489d6ea4',
      label: '4p',
      name: '4. การจัดการความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศ',
      maxScore: 23,
      score: 0,
      percent: 0,
      maturityModelLV: 'Initial',
    },
    {
      ObjectUUID: '97ced9a4-4b5b-40c7-8147-10a956a1d1d2',
      label: '5p',
      name: '5. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
      maxScore: 16,
      score: 6,
      percent: 37.5,
      maturityModelLV: 'Developing',
    },
    {
      ObjectUUID: '59cc5b5a-fb96-4b9b-b5e1-a89953c13945',
      label: '6p',
      name: '6. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
      maxScore: 33,
      score: 5,
      percent: 15.151515151515152,
      maturityModelLV: 'Initial',
    },
    {
      ObjectUUID: '3285b9ff-4f41-4b73-a586-ff33552e124d',
      label: '7p',
      name: '7.ข้อเสนอแนะอื่น ๆ โรงพยาบาลสามารถให้ข้อเสนอแนะเพื่อเป็นกรณีศึกษา และปรับปรุงการประเมินในปีถัดไป',
      maxScore: 0,
      score: 0,
      percent: 0,
      maturityModelLV: 'Initial',
    },
  ],
  avgOfOrg: {
    scores: [
      {
        name: 'พระศรีมหาโพธิ์',
        key: '74843226-00ff-11ee-9433-4a45a23ab86b',
        hcode: 12269,
        branchID: '74924168-00ff-11ee-9433-4a45a23ab86b',
        branchName: 'พระศรีมหาโพธิ์',
        organizationID:
          '74843226-00ff-11ee-9433-4a45a23ab86b',
        organizationName: 'พระศรีมหาโพธิ์',
        '5f5f9d9e-1a95-421a-909e-cc1dea7dba7b': 0,
        'a7e01e30-3672-4193-b1cf-592eeb2417bf': 0,
        'e089cbc1-178e-432b-bb2c-bcfdfd7a058a': 0,
        '3201f9b4-4097-4d05-8874-182d489d6ea4': 0,
        '97ced9a4-4b5b-40c7-8147-10a956a1d1d2': 37.5,
        '59cc5b5a-fb96-4b9b-b5e1-a89953c13945': 15.151515151515152,
        '3285b9ff-4f41-4b73-a586-ff33552e124d': 0,
        avg: 10.530303030303031,
        is_branch: false,
      },
    ],
    avgHorizontal: {
      key: 'avgHorizontal',
      name: 'ค่าเฉลี่ย 1 องค์กร',
      '5f5f9d9e-1a95-421a-909e-cc1dea7dba7b': 0,
      'a7e01e30-3672-4193-b1cf-592eeb2417bf': 0,
      'e089cbc1-178e-432b-bb2c-bcfdfd7a058a': 0,
      '3201f9b4-4097-4d05-8874-182d489d6ea4': 0,
      '97ced9a4-4b5b-40c7-8147-10a956a1d1d2': 37.5,
      '59cc5b5a-fb96-4b9b-b5e1-a89953c13945': 15.151515151515152,
      '3285b9ff-4f41-4b73-a586-ff33552e124d': 0,
      avg: 10.530303030303031,
    },
    meta: [
      {
        key: '5f5f9d9e-1a95-421a-909e-cc1dea7dba7b',
        value: '1. ข้อมูลพื้นฐานของโรงพยาบาล',
      },
      {
        key: 'a7e01e30-3672-4193-b1cf-592eeb2417bf',
        value: '2. แผนแม่บทเทคโนโลยีสารสนเทศ',
      },
      {
        key: 'e089cbc1-178e-432b-bb2c-bcfdfd7a058a',
        value:
          '3. การจัดการความเสี่ยงในระบบเทคโนโลยีสารสนเทศ',
      },
      {
        key: '3201f9b4-4097-4d05-8874-182d489d6ea4',
        value:
          '4. การจัดการความมั่นคงปลอดภัยในระบบเทคโนโลยีสารสนเทศ',
      },
      {
        key: '97ced9a4-4b5b-40c7-8147-10a956a1d1d2',
        value: '5. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
      },
      {
        key: '59cc5b5a-fb96-4b9b-b5e1-a89953c13945',
        value: '6. การจัดระบบบริการเทคโนโลยีสารสนเทศ',
      },
      {
        key: '3285b9ff-4f41-4b73-a586-ff33552e124d',
        value:
          '7.ข้อเสนอแนะอื่น ๆ โรงพยาบาลสามารถให้ข้อเสนอแนะเพื่อเป็นกรณีศึกษา และปรับปรุงการประเมินในปีถัดไป',
      },
    ],
  },
  maturityModelID: '30f3f592-f6db-11ed-b599-0e893f001bb9',
  maturityModel: {
    name: 'Model 001',
    modelType: 'aa8bd95c-42e8-4357-94df-01b956fb31d9',
    description: 'Model 001',
    ObjectUUID: '30f3f592-f6db-11ed-b599-0e893f001bb9',
    ObjectID: 'SettingMatutityModel',
    ObjectType:
      'SettingMatutityModel/30f3f592-f6db-11ed-b599-0e893f001bb9',
    TenantID: 'Deunjam',
    createdDt: '2023-05-20 13:54:39',
    createdBy: 'timesatit@gmail.com',
    updatedDt: '2023-07-17 13:36:31',
    updatedBy: 'timesatit@gmail.com',
    isDelete: false,
    detail: [
      {
        columnName: 'tyty',
        columnDetail: 'Underdeveloped',
        icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/developing-8fdadc6f3a79.png',
        description:
          '<ul><li>หน่วยงานยังไม่มีการจัดทำแผนที่สอดคล้องกับแผนพัฒนารัฐบาลดิจิทัล</li><li>หน่วยงานยังไม่มีแผนและรายชื่อ ชุดข้อมูลที่คาดว่าจะทำธรรมาภิบาลข้อมูลภาครัฐหรือมีรายชื่อชุดข้อมูลที่คาดว่าจะทำธรรมาภิบาลข้อมูล แล้ว แต่ยังไม่มีแผนการดำเนินงาน</li><li>หน่วยงานไม่มีการเปิดเผยข้อมูลในระดับใดเลย</li><li>หน่วยงานไม่มีการเปิดเผยชุดข้อมูลเปิดภาครัฐในรูปแบบดิจิทัลต่อสาธารณะ</li><li>หน่วยงานไม่มีการนำข้อมูลไป วิเคราะห์</li></ul>',
        ObjectUUID:
          'eb2fda9a-b4f5-426b-919e-b41b636b426b',
      },
      {
        columnName: 'Developing',
        columnDetail: 'Traditional',
        icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/defined-c03a598317c8.png',
        description:
          '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัลเป็นส่วนน้อยซึ่งยังไม่ครบทุกแนวทาง ปฏิบัติและมาตรการที่จำ เป็น(แยกตามภารกิจหลักของ หน่วยงาน)</li><li>หน่วยงานมีรายชื่อชุดข้อมูลที่คาดว่าจะทำธรรมาภิ บาลข้อมูลภาครัฐ และแผนการดำเนินงาน แล้วแต่ยังไม่มีการดำเนินงาน</li><li>หน่วยงานมีการเปิดเผยข้อมูลในระดับ 1 ดาว ซึ่งประกอบไฟล์ PDF, DOC, TXT, TIFF และ JPEG</li><li>หน่วยงานมีการเปิดเผยชุดข้อมูล ต่อสาธารณะแต่ไม่ได้ถูกดึงไป แสดงบน เว็บไซต์กลาง (data.go.th)</li><li>หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ 1 ใน 4 ข้อ</li></ul>',
        ObjectUUID:
          '737a8976-05db-47b1-bca8-44616f0f4b32',
      },
      {
        columnName: 'Defined',
        columnDetail: 'Developed',
        icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/initial-13b6282caa57.png',
        description:
          '<ul><li>หน่วยงานมีการจัดทำแผนที่สอดคล้องกับแผนพัฒนารัฐบาลดิจิทัล บางส่วนซึ่งยังไม่ครบทุกแนวทาง ปฏิบัติและมาตรการที่จำเป็น (แยกตามภารกิจหลักของหน่วย งาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันแล้ว 3 ข้อ ตามกำหนด</li><li>หน่วยงานมีการเปิดเผยข้อมูลใน ระดับ 2 ดาว ซึ่งประกอบด้วยไฟล์ XLS</li><li>หน่วยงานมีการเปิดเผยชุดข้อมูล ต่อสาธารณะบน เว็บไซต์กลาง (data.go.th)และเปิดเผยชุดข้อ- มูลใน GD Catalog หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ 2 ใน 4 ข้อ</li></ul>',
        ObjectUUID:
          '1985e341-298a-4642-9663-1c5c57da7890',
      },
      {
        columnName: 'Managed',
        columnDetail: 'Insight-driven Transformation',
        icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/managed-08c41e508c01.png',
        description:
          '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัล เกือบครบทุกแนวทางปฏิบัติและมาตรการที่จำเป็น(แยกตามภารกิจ หลักของหน่วยงาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันแล้ว 4 ข้อ ตามกำหนด</li><li>หน่วยงานมีการเปิดเผยข้อ 3 ดาวขึ้นไป ซึ่งประกอบด้วยไฟล์ CSV, ODS, XML, JSON, KML, SHP, KMZ, RDF (URIs), RDF, (Linked data)</li><li>หน่วยงานมีการเปิดเผยข้อมูลต่อ สาธารณะบนเว็บไซต์ กลาง(data.go.th)และเปิดเผยชุดข้อมูลใน GD Catalog โดยมีชุด ข้อมูลเปิด เผยเพิ่ม ขึ้น 30% เมื่อเทียบกับปีก่อนหน้า หน่วยงานมีการนำข้อมูลใช้ในการ วิเคราะห์ 3 ใน 4 ข้อ</li></ul>',
        ObjectUUID:
          'ece42e25-f875-4dd0-941d-44a9e6b8fc6f',
      },
      {
        columnName: 'Optimizing',
        columnDetail: 'Sustainability',
        icon: 'https://file-management-public.s3.amazonaws.com/assessment-automation/maturity-model/optimizing-17fcfe4dcd77.png',
        description:
          '<ul><li>หน่วยงานมีการจัดทำแผนที่สอด คล้องกับแผนพัฒนารัฐบาลดิจิทัล เกือบครบทุกแนวทางปฏิบัติและมาตรการที่จำเป็น(แยกตามภารกิจ หลักของหน่วยงาน)</li><li>หน่วยงานมีการดำเนินการเกี่ยวกับธรรมาภิบาลข้อมูลภาครัฐในด้าน เดียวกันครบถ้วนทุกข้อ</li><li>หน่วยงานมีการเปิดเผยข้อมูลใน ระดับ 3ดาวขึ้นไปซึ่งประกอบด้วย ไฟล์ CSV, ODS, XML, JSON, KML, SHP, KMZ, RDF (URIs), RDF, (Linked data)</li><li>หน่วยงานมีการเปิดเผยข้อมูลต่อ สาธารณะบนเว็บไซต์กลาง (data.go.th)และเปิดเผยชุดข้อ-มูลใน GDCatalogโดยมีชุดข้อ-มูลเปิดเผยเพิ่มขึ้น 30% เมื่อเทียบกับปีก่อนหน้าและมีการ นำข้อมูลไปใช้ประโยชน์ หน่วยงานมีการนำข้อมูลมาใช้ใน การวิเคราะห์ครบถ้วนทั้ง 4 ข้อ</li></ul>',
        ObjectUUID:
          '047d1fac-ce0e-4374-96c3-d95c5c0f5f82',
      },
    ],
  },
};

export const assessmentSubmissionReport = {
  graph,
  'graph-meta': graphMeta,
  table,
};

export const assessmentSubmission = {
  list: listAssessmentSubmission,
  allRespondents: listAssessmentSubmissionAllRespondents,
  respondent: listAssessmentSubmissionRespondent,
  respondentLog: listAssessmentSubmissionRespondentLog,
  assessmentSubmissionSetting,
  ranking,
  report: report,
  info: assessmentSubmissionInfo,
};
