import { Meta, Story } from '@storybook/react';

import {
  CommentBox,
  CommentBoxProps,
} from './comment-box';

export default {
  title: 'Components/CommentBox',
  component: CommentBox,
} as Meta;

const Template: Story<CommentBoxProps> = (args) => (
  <CommentBox {...args} />
);

export const Default = Template.bind({});

Default.args = {};
