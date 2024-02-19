import { Meta, Story } from '@storybook/react';

import {
  DragLeftWrapper,
  DragLeftWrapperProps,
} from './drag-left-wrapper';

export default {
  title: 'Components/DragLeftWrapper',
  component: DragLeftWrapper,
} as Meta;

const Template: Story<DragLeftWrapperProps> = (args) => (
  <DragLeftWrapper {...args} />
);

export const Default = Template.bind({});

Default.args = {};
