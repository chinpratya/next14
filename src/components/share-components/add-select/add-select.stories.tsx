import { Meta, Story } from '@storybook/react';

import { AddSelect, AddSelectProps } from './add-select';

export default {
  title: 'Components/AddSelect',
  component: AddSelect,
} as Meta;

const Template: Story<AddSelectProps> = (args) => (
  <AddSelect {...args} />
);

export const Default = Template.bind({});

Default.args = {};
