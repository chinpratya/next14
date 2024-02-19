import { Meta, Story } from '@storybook/react';

import { Tags, TagsProps } from './tags';

export default {
  title: 'Share/Tags',
  component: Tags,
} as Meta;

const Template: Story<TagsProps> = (args) => (
  <Tags {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tags: ['tag1', 'tag2', 'tag3'],
};
