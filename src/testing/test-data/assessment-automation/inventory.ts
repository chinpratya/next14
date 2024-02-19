import { uid } from '@/utils';

const listInventory = [
  {
    ObjectUUID: uid(),
    name: 'แบบฟอร์ม 1',
    type: ['ความพร้อม (PDPA)'],
    version: 'draft',
    status: 'draft',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: uid(),
    name: 'แบบฟอร์ม 2',
    type: ['ความสามารถ (PDPA)'],
    version: '1',
    status: 'complete',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: uid(),
    name: 'แบบฟอร์ม 3',
    type: ['ความพร้อม (Cyber)'],
    version: '1',
    status: 'complete',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
  {
    ObjectUUID: uid(),
    name: 'แบบฟอร์ม 4',
    type: ['ความสามารถ (Cyber)'],
    version: '1',
    status: 'complete',
    createdDt: '2023-03-19 10:00',
    createdBy: 'admin',
    updatedDt: '2023-03-23 10:00',
    updatedBy: 'admin',
  },
];
export const inventory = {
  list: listInventory,
};
