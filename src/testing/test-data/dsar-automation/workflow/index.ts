import { v4 as uuidv4 } from 'uuid';

import { tasks } from './tasks';

const getWorkflowStage = () => {
  const names = [
    'ยืนยันตัวตนของเจ้าของข้อมูล',
    'พิจารณาคำขอ',
    'ดำเนินการตามคำขอ',
    'แจ้งเจ้าของข้อมูล',
    'แจ้งเจ้าของข้อมูล',
    'แจ้งเจ้าของข้อมูล',
  ];

  return names.map((name, index) => ({
    stageID: uuidv4(),
    name,
    order: index + 1,
    set_start_time: false,
    auto_complete: false,
    sent_email_if_start: false,
    sent_email_if_complete: false,
  }));
};

const list = [
  {
    workflowID: '4f67d9e3-508f-4832-bbf8-2d4ca8e42a20',
    name: 'WorkFlow1',
    status: 'active',
    version: 1,
    description: 'description.',
    createdDt: '2023-09-01T00:00:00Z',
    updatedDt: '2023-10-01T00:00:00Z',
    tagID: ['eefe7a49-5871-4279-90f9-a790f626eefa'],
    tagName: ['tag1'],
    stages: getWorkflowStage(),
  },
  {
    workflowID: '56d9e558-e95f-45fa-83c4-b44a50737f44',
    name: 'WorkFlow2',
    status: 'active',
    version: 2,
    description: 'description.',
    createdDt: '2023-09-01T00:00:00Z',
    updatedDt: '2023-10-01T00:00:00Z',
    tagID: [
      'eefe7a49-5871-4279-90f9-a790f626eefa',
      'eefe7a49-5871-4279-90f9-a790f626eefc',
    ],
    tagName: ['tag1', 'tag3'],
    stages: getWorkflowStage(),
  },
  {
    workflowID: 'd1d6e990-d1ee-4c10-be23-05be6501dc78',
    name: 'WorkFlow3',
    status: 'inactive',
    version: 1,
    description: 'description.',
    createdDt: '2023-09-01T00:00:00Z',
    updatedDt: '2023-10-01T00:00:00Z',
    tagID: ['eefe7a49-5871-4279-90f9-a790f626eefa'],
    tagName: ['tag1'],
    stages: getWorkflowStage(),
  },
];

const meta = {
  priority: [
    {
      name: 'Hight',
      ObjectUUID: 'Hight',
    },
    {
      name: 'Medium',
      ObjectUUID: 'Medium',
    },
    {
      name: 'Low',
      ObjectUUID: 'low',
    },
  ],
  stages_init: ['step1', 'step2', 'step3', 'step4'],
};

export const workflow = {
  list,
  meta,
  getWorkflowStage,
  tasks,
};
