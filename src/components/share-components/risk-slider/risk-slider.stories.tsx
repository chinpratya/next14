import { Meta, Story } from '@storybook/react';

import {
  RiskSlider,
  RiskSliderProps,
} from './risk-slider';

export default {
  title: 'Share/RiskSlider',
  component: RiskSlider,
} as Meta;

const Template: Story<RiskSliderProps> = (args) => (
  <RiskSlider {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: 'equal',
  onChange: (value) => console.log(value),
};
