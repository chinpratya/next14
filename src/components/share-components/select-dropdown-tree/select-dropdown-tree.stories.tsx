import { Meta, Story } from '@storybook/react';

import {
  SelectDropdownTree,
  SelectDropdownTreeProps,
} from './select-dropdown-tree';

export default {
  title: 'Components/SelectDropdownTree',
  component: SelectDropdownTree,
} as Meta;

const Template: Story<SelectDropdownTreeProps> = (
  args
) => <SelectDropdownTree {...args} />;

export const Default = Template.bind({});

Default.args = {};
