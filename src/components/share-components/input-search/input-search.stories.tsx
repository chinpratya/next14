import { Meta, Story } from '@storybook/react';

import {
  InputSearch,
  InputSearchProps,
} from './input-search';

export default {
  title: 'Share/InputSearch',
  component: InputSearch,
} as Meta;

const Template: Story<InputSearchProps> = (args) => (
  <InputSearch {...args} />
);

export const Default = Template.bind({});

Default.args = {};
