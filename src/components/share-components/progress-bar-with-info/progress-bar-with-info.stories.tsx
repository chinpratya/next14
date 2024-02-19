import { Meta, Story } from '@storybook/react';

import {
  ProgressBarWithInfo,
  ProgressBarWithInfoProps,
} from './progress-bar-with-info';

export default {
  title: 'Share/Progress',
  component: ProgressBarWithInfo,
} as Meta;

const Template: Story<ProgressBarWithInfoProps> = (
  args
) => <ProgressBarWithInfo {...args} />;

export const Default = Template.bind({});

Default.args = {
  count: 20,
  total: 100,
};
