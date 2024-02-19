import { Meta, Story } from '@storybook/react';

import { TagItems, TagItemsProps } from './tag-items';

export default {
  title: 'Components/TagItems',
  component: TagItems,
} as Meta;

const Template: Story<TagItemsProps> = (args) => (
  <TagItems {...args} />
);

export const Default = Template.bind({});

Default.args = {};
