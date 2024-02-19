import { Meta, Story } from '@storybook/react';

import {
  ProgressBar,
  ProgressBarProps,
} from './progress-bar';

export default {
  title: 'Share/ProgressBar',
  component: ProgressBar,
} as Meta;

const Template: Story<ProgressBarProps> = (args) => (
  <ProgressBar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  current: 20,
  total: 100,
};
