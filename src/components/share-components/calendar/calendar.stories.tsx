import { Meta, Story } from '@storybook/react';
import { CalendarProps } from 'antd';
import { Dayjs } from 'dayjs';

import Calendar from './calendar';

export default {
  title: 'share/Calendar',
  component: Calendar,
} as Meta;

const Template: Story<CalendarProps<Dayjs>> = (args) => (
  <Calendar {...args} />
);

export const Default = Template.bind({});

Default.args = {};
