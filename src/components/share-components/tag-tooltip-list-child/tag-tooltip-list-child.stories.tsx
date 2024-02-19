import { Meta, Story } from '@storybook/react';

import {
  TagTooltipListChild,
  TagTooltipListChildProps,
} from './tag-tooltip-list-child';

export default {
  title: 'Components/TagTooltipListChild',
  component: TagTooltipListChild,
} as Meta;

const Template: Story<TagTooltipListChildProps> = (
  args
) => <TagTooltipListChild {...args} />;

export const Default = Template.bind({});

Default.args = {
  list: ['tags1', 'tags2', 'tags3'],
};
