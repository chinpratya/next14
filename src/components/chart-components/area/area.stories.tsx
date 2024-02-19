import { Meta, Story } from '@storybook/react';

import { Area, AreaProps } from './area';

export default {
  title: 'Chart/Area',
  component: Area,
} as Meta;

const Template: Story<AreaProps> = (args) => (
  <Area {...args} />
);

export const Default = Template.bind({});

Default.args = {};
