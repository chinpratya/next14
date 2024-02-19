import { questionnaire } from './questionnaire';

const list = [
  {
    ObjectID: '',
    ObjectType: '',
    ObjectUUID: 'f1cd484a-7001-4b2d-b872-f07b9dc93c28',
    name: 'ประเมินความรู้ความเข้าใจนโยบายคุ้มครองส่วนบุคคล',
    policy:
      'นโยบายความเป็นส่วนตัว บริษัท Brandon Co., Ltd.',
    period: '30',
    created_dt: '2023-10-01T00:00:00Z',
    created_by: 'wolf@securitypitch.com',
    updated_at: '2023-10-01T00:00:00Z',
    updated_by: 'Admin',
  },
  {
    ObjectID: '',
    ObjectType: '',
    ObjectUUID: '7d15384f-518a-4791-86c0-d69dcae42a69',
    name: 'การประเมินนโยบายความเป็นส่วนตัว',
    policy:
      'นโยบายความเป็นส่วนตัว โรงพยาบาลเทพศิรินทร์ TRH',
    period: '30',
    created_dt: '2023-10-01T00:00:00Z',
    created_by: 'wolf@securitypitch.com',
    updated_at: '2023-10-01T00:00:00Z',
    updated_by: 'Admin',
  },
];

const dashboard = {
  ObjectUUID: '',
  all_questionnaires: [
    {
      name: 'questionnaire 1',
      number_responses: '1',
      total: '2',
    },
    {
      name: 'questionnaire 2',
      number_responses: '1',
      total: '16',
    },
    {
      name: 'questionnaire 3',
      number_responses: '1',
      total: '15',
    },
    {
      name: 'questionnaire 4',
      number_responses: '1',
      total: '5',
    },
  ],
  answering_questionnaires: [
    {
      number_responses: '1',
      response_date: '2023-10-01',
    },
    {
      number_responses: '2',
      response_date: '2023-10-02',
    },
    {
      number_responses: '3',
      response_date: '2023-10-03',
    },
    {
      number_responses: '4',
      response_date: '2023-10-04',
    },
  ],
};

export const assessments = {
  list,
  dashboard,
  questionnaire,
};
