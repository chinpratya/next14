import { Meta, Story } from '@storybook/react';

import { ECOption } from '@/types';

import { Line } from './line';

export default {
  title: 'Chart/Line',
  component: Line,
} as Meta;

const Template: Story<ECOption> = (args) => (
  <Line {...args} />
);

export const Default = Template.bind({});

Default.args = {
  // xData: [
  //   'Mon',
  //   'Tue',
  //   'Wed',
  //   'Thu',
  //   'Fri',
  //   'Sat',
  //   'Sun',
  // ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [
        9.7, 38.57, 0.61, 25.42, 28.99, 58.46, 29.84,
      ],
      type: 'bar',
      barWidth: '30%',
    },
  ],
  title: {
    text: 'แนวโน้ม',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      rotate: -4,
      // textStyle: {
      //   overflow: 'hidden',
      //   textOverflow: 'ellipsis',
      //   whiteSpace: 'nowrap',
      // },
    },
    data: [
      'เทศศศ',
      'โอ๊ตเทส 5 รพ เพื่อเอาข้อมูลไปเทส Dashboard',
      'JitDee',
      'เทสส่งแก้ไข โอ๊ต',
      'ทดสอบ ฟอมใหม่',
      'Trassessment 1',
      'ทดสอบครั้งที่ 1111 โอ๊ต',
    ],
  },
};
