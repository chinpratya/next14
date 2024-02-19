// eslint-disable-next-line import/no-cycle
import { form } from './form';

const initialData = {
  ObjectUUID: 'bd3e8c36-83c5-46f9-8c71-f001f07f43ca',
  type: ['ความพร้อม (PDPA)'],
  version: 1,
  status: 'draft',
  createdDt: '2023-03-19 10:00',
  description: 'etc.',
  createdBy: 'admin',
  updatedDt: '2023-03-23 10:00',
  updatedBy: 'admin',
  group: ['ความพร้อม (PDPA)'],
};

const listAssessment = Array.from(
  { length: 12 },
  (_, index) => ({
    ...initialData,
    ObjectUUID: `${initialData.ObjectUUID}-${index + 1}`,
    name: `assessment-${index + 1}`,
  })
);

export const assessment = {
  list: listAssessment,
  form,
};
