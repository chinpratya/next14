import { Meta, Story } from '@storybook/react';

import {
  SelectFormFields,
  SelectFormFieldsProps,
} from './select-form-fields';

export default {
  title: 'Share/SelectFormFields',
  component: SelectFormFields,
} as Meta;

const Template: Story<SelectFormFieldsProps> = (args) => (
  <SelectFormFields {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'ข้อความ',
  fields: ['long-text', 'short-text'],
};
