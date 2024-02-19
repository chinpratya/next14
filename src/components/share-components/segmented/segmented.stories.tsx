import { Meta, Story } from '@storybook/react';

import { Segmented, SegmentedProps } from './segmented';

export default {
  title: 'Components/Segmented',
  component: Segmented,
} as Meta;

const Template: Story<SegmentedProps> = (args) => (
  <Segmented {...args} />
);

export const Default = Template.bind({});

Default.args = {
  options: [
    {
      label: 'ข้อมูลพื้นฐาน',
      value: 'basic',
    },
    {
      label: 'ข้อมูลเพิ่มเติม',
      value: 'additional',
    },
  ],
};
