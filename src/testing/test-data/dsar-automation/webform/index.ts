import { meta } from './meta';
import { template } from './template';
import { version } from './version';

const list = [
  {
    webfromID: '64d460e4-b292-4795-bf17-363d3e71f059',
    name: 'เว็บฟอร์ม 1',
    approvedID: 'ec60669f-7f10-4f44-ab8f-bad39e313831',
    workflowID: 'd1d6e990-d1ee-4c10-be23-05be6501dc78',
    defaultLanguage: 'th-TH',
    language: 'ไทย',
    status: 'draft',
    islanguage: false,
    isCaptcha: false,
    description: 'คำอธิบาย: นโยบายใช้สำหรับ...',
    isSentEmail: false,
    emailBody: '',
    sentbeforeclose: 0,
    endfrom: 0,
    remind: 2,
    isVerifyEmail: false,
    lifetime: 1,
    createdDt: '2021-08-31T08:00:00.000Z',
    createdBy: 'admin',
    detail: 'Thailand (PDPA)',
  },
];

export const webform = {
  meta,
  template,
  version,
  list,
};
