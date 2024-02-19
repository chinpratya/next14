import { Meta, Story } from '@storybook/react';

import {
  DropdownTable,
  DropdownTableProps,
} from './dropdown-table';

const meta: Meta = {
  title: 'Share/DropdownTable',
  component: DropdownTable,
};

export default meta;

const Template: Story<DropdownTableProps> = (props) => (
  <DropdownTable {...props} />
);

export const Default = Template.bind({});

Default.args = {
  items: [
    { label: 'แก้ไข', key: 'edit' },
    { label: 'ลบ', key: 'delete' },
  ],
};
