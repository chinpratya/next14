import { meta } from './meta';
import { version } from './version';

const list = [
  {
    workID: 'ad9f4e13-9b3f-49f1-a995-b276f2a631fe',
    workName: 'ตรวจสอบการยืนยันตัวตน',
    workflowname: 'ขอใช้สิทธิตามกฎหมาย',
    stage: 'Verifying Identity',
    approve: 'saitarn.a@securitypitch.com',
    status: 'assigned',
    createDt: '2023-09-01T00:00:00Z',
    deadlineDt: '2023-09-01T00:00:00Z',

    approveID: '',
    description: '',
    remindDt: '2023-09-01T00:00:00Z',
    isRequired: true,
    isComment: true,
    isResolution: true,
    requestID: '',
    email: 'mail@securitypitch.com',
    typeRequest: 'เพิกถอนความยินยอม',
    labels: '',
    reminded: [
      {
        type: 'before',
        time: 3,
        responsible: ['test'],
      },
    ],
    isSetNotificationTime: true,
    endDate: 3,
  },
  {
    workID: 'b13b036c-1cff-4a9f-952c-b7b8a6044e74',
    workName: 'ตรวจสอบการยืนยันตัวตน',
    workflowname: 'ขอใช้สิทธิตามกฎหมาย',
    stage: 'Verifying Identity',
    approve: 'saitarn.a@securitypitch.com',
    status: 'assigned',
    createDt: '2023-09-01T00:00:00Z',
    deadlineDt: '2023-09-01T00:00:00Z',

    approveID: '',
    description: '',
    remindDt: '2023-09-01T00:00:00Z',
    isRequired: true,
    isComment: true,
    isResolution: true,
    requestID: '',
    email: 'mail@securitypitch.com',
    typeRequest: 'เพิกถอนความยินยอม',
    labels: '',
    reminded: [
      {
        type: 'before',
        time: 3,
        responsible: ['test'],
      },
      {
        type: 'onetime',
        time: 5,
        responsible: ['test'],
      },
    ],
    isSetNotificationTime: true,
    endDate: 3,
  },
];

export const task = {
  list,
  meta,
  version,
};
