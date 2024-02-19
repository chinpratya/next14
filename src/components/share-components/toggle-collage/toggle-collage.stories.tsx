import { Meta, Story } from '@storybook/react';

import {
  ToggleCollage,
  ToggleCollageProps,
} from './toggle-collage';

export default {
  title: 'Share/ToggleCollage',
  component: ToggleCollage,
} as Meta;

const Template: Story<ToggleCollageProps> = (args) => (
  <ToggleCollage {...args} />
);

export const Default = Template.bind({});

Default.args = {};
