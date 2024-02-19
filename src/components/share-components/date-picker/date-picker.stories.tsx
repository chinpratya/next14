import { Meta, Story } from '@storybook/react';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';

import DatePicker from './date-picker';

export default {
  title: 'share/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<PickerProps<Dayjs>> = (args) => (
  <DatePicker {...args} />
);

export const Default = Template.bind({});

Default.args = {};
