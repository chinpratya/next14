import { Meta, Story } from '@storybook/react';

import {
  TableScore,
  TableScoreProps,
} from './table-score';

export default {
  title: 'Components/TableScore',
  component: TableScore,
} as Meta;

const Template: Story<TableScoreProps> = (args) => (
  <TableScore {...args} />
);

export const Default = Template.bind({});

const rangeScore = [
  {
    key: 'high',
    text: 'สูง',
    range: [11, 12, 15, 16, 20, 25],
    color: '#EB3223',
  },
  {
    key: 'medium',
    text: 'ปานกลาง',
    range: [5, 6, 7, 8, 9, 10],
    color: '#FADA4A',
  },
  {
    key: 'low',
    text: 'ต่ำ',
    range: [1, 2, 3, 4],
    color: '#60B257',
  },
];
const target = {
  x: 5,
  y: 5,
  text: 'ก่อนจัดการความเสี่ยง',
  color: '#5008C9',
};
Default.args = { rangeScore, target };
