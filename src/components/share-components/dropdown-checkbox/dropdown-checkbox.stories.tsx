import { Meta, Story } from '@storybook/react';

import {
  DropdownCheckbox,
  DropdownCheckboxProps,
} from './dropdown-checkbox';

export default {
  title: 'Components/DropdownCheckbox',
  component: DropdownCheckbox,
} as Meta;

const Template: Story<DropdownCheckboxProps> = (args) => (
  <DropdownCheckbox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  option: [
    {
      label: 'โรงบาล 1',
      value: '1',
    },
    {
      label: 'โรงบาล 2',
      value: '2',
    },
    {
      label: 'โรงบาล 3',
      value: '3',
    },
    {
      label: 'โรงบาล 4',
      value: '4',
    },
  ],
  onFinish: (id: string[]) => console.log('id', id),
  valueKey: ['1', '4'],
};
