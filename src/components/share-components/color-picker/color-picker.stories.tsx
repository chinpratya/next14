import { Meta, Story } from '@storybook/react';

import {
  ColorPicker,
  ColorPickerProps,
} from './color-picker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as Meta;

const Template: Story<ColorPickerProps> = (args) => (
  <ColorPicker {...args} />
);

export const Default = Template.bind({});

Default.args = {};
