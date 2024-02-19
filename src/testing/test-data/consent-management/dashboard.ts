const count = {
  SubjectIdentifierCount: 1,
  ConsnetCount: 2,
  TransactionCount: 3,
};

const consent = [
  {
    name: 'consent form',
    SourceCount: 10,
  },
  {
    name: 'email',
    SourceCount: 10,
  },
  {
    name: 'เอกสารแนบ',
    SourceCount: 11,
  },
  {
    name: 'cookie banner',
    SourceCount: 36,
  },
];

const activity = [
  {
    ObjectUUID: '9e9a1718-5a9d-4c56-abc7-800ed0772090',
    name: 'activity1',
    activityCount: 10,
  },
  {
    ObjectUUID: '158144b8-d265-4b58-80dc-3e9dd8f90230',
    name: 'activity2',
    activityCount: 10,
  },
  {
    ObjectUUID: '9576ca98-f23c-4d5f-ad67-2de80658882d',
    name: 'activity3',
    activityCount: 11,
  },
];

const accept = [
  {
    activityID: '7161f671-a2f0-44bd-b118-4c9b0535d0ab',
    name: 'accept 1',
    acceptCount: 20,
    rejectCount: 30,
  },
  {
    activityID: 'd7d6a244-76d1-4426-a67f-deac809cf7e6',
    name: 'accept 2',
    acceptCount: 10,
    rejectCount: 50,
  },
  {
    activityID: '9a1964e8-54e1-483b-b62c-7b828cca5593',
    name: 'accept 3',
    acceptCount: 15,
    rejectCount: 30,
  },
  {
    activityID: '814abaaa-8dcf-43e8-b931-be9cc4fc3358',
    name: 'accept 4',
    acceptCount: 25,
    rejectCount: 35,
  },
  {
    activityID: '7f864804-4168-49f4-89f1-dc2ab52a1e90',
    name: 'accept 5',
    acceptCount: 20,
    rejectCount: 31,
  },
  {
    activityID: 'b5465d74-d62d-4b47-a61c-7cd436d8ad2f',
    name: 'accept 6',
    acceptCount: 10,
    rejectCount: 21,
  },
];

export const dashboard = {
  count,
  consent,
  activity,
  accept,
};
