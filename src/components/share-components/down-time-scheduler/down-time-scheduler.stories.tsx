import { Meta, Story } from '@storybook/react';

import {
  DownTimeScheduler,
  DownTimeSchedulerProps,
} from './down-time-scheduler';

const meta: Meta = {
  title: 'Share/DownTimeScheduler',
  component: DownTimeScheduler,
};

export default meta;

const Template: Story<DownTimeSchedulerProps> = (
  props
) => <DownTimeScheduler {...props} />;

export const Default = Template.bind({});

Default.args = {};
