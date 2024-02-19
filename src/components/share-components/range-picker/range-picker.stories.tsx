import { Meta, Story } from '@storybook/react';
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';

import RangePicker from './range-picker';

export default {
  title: 'share/RangePicker',
  component: RangePicker,
} as Meta;

const Template: Story<RangePickerProps<Dayjs>> = (
  args
) => <RangePicker {...args} />;

export const Default = Template.bind({});

Default.args = {};
