import { Meta, Story } from '@storybook/react';

import { Radar, RadarProps } from './radar';

export default {
  title: 'Components/Radar',
  component: Radar,
} as Meta;

const Template: Story<RadarProps> = (args) => (
  <Radar {...args} />
);

export const Default = Template.bind({});

Default.args = {};
