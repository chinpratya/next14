import { Meta, Story } from '@storybook/react';

import TimePicker, {
  TimePickerProps,
} from './time-picker';

export default {
  title: 'Share/TimePicker',
  component: TimePicker,
} as Meta;

const Template: Story<TimePickerProps> = (args) => (
  <TimePicker {...args} />
);

export const Default = Template.bind({});

Default.args = {};
