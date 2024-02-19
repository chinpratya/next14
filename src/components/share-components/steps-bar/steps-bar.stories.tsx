import { Meta, Story } from '@storybook/react';

import { StepsBar, StepsBarProps } from './steps-bar';

export default {
  title: 'Components/StepsBar',
  component: StepsBar,
} as Meta;

const Template: Story<StepsBarProps> = (args) => (
  <StepsBar {...args} />
);

export const Default = Template.bind({});

Default.args = {};
