import { form } from './form';
import { meta } from './meta';
import { task } from './task';
import { verification } from './verification';

const list = [
  {
    requestID: '7b1ace72-54ca-4dcd-8ad7-b55ac6318d74',
    name: 'นายนพรัตน์',
    status: 'Opened',
    timeReminded: 0,
    isExtraTime: false,
    createDt: '2023-09-01T00:00:00Z',

    webfromName: 'Myself',
    typeOfRequest: 'เพิกถอนความยินยอม',
    approvedID: '',
    approved: 'nopparat.k+none99@securitypitch.com',
    states: [],
    currecnt_state: 1,
    workflow: 'PDPA Workflow',
    workflowVersion: 1,
    isEditExtraTime: false,
    endProcressDt: '2023-09-01T00:00:00Z',
    limitExtraDt: '2023-09-01T00:00:00Z',
    language: 'ภาษาไทย',
  },
  {
    requestID: 'e1187a20-1480-4986-a3c5-2d5768c21ce5',
    name: 'Tristan',
    status: 'Opened',
    timeReminded: 0,
    isExtraTime: false,
    createDt: '2023-09-01T00:00:00Z',

    webfromName: 'Myself',
    typeOfRequest: 'เพิกถอนความยินยอม',
    approvedID: '',
    approved: 'nopparat.k+none99@securitypitch.com',
    states: [],
    currecnt_state: 1,
    workflow: 'PDPA Workflow',
    workflowVersion: 1,
    isEditExtraTime: false,
    endProcressDt: '2023-09-01T00:00:00Z',
    limitExtraDt: '2023-09-01T00:00:00Z',
    language: 'ภาษาไทย',
  },
];

export const request = {
  list,
  form,
  meta,
  task,
  verification,
};
