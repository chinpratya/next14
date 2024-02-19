import { Meta, Story } from '@storybook/react';

import {
  BeautifulTree,
  BeautifulTreeProps,
} from './beautiful-tree';

export default {
  title: 'Components/BeautifulTree',
  component: BeautifulTree,
} as Meta;

const Template: Story<BeautifulTreeProps> = (args) => (
  <BeautifulTree {...args} />
);

export const Default = Template.bind({});

Default.args = {};
