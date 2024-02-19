import { Meta, Story } from '@storybook/react';

import {
  DropdownRedio,
  DropdownRedioProps,
} from './dropdown-redio';

export default {
  title: 'Components/DropdownRedio',
  component: DropdownRedio,
} as Meta;

const Template: Story<DropdownRedioProps> = (args) => (
  <DropdownRedio {...args} />
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
  onFinish: (id: string) => console.log('id', id),
  // valueKey: '4',
};
