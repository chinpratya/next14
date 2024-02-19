import { Meta, Story } from '@storybook/react';

import { Advisor, AdvisorProps } from './advisor';

export default {
  title: 'Share/Advisor',
  component: Advisor,
} as Meta;

const Template: Story<AdvisorProps> = (args) => (
  <div className="w-50">
    <Advisor {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  label: 'การจัดหมวดหมู่ข้อมูล',
  adviser: 'คำแนะสำหรับการจัดหมวดหมู่ข้อมูล',
  href: 'https://www.onefence.co/what-is-personal-data',
  target: '_blank',
};
