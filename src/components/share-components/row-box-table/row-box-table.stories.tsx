import { Meta, Story } from '@storybook/react';

import {
  RowBoxTable,
  RowBoxTableProps,
} from './row-box-table';

const meta: Meta = {
  title: 'Share/RowBoxTable',
  component: RowBoxTable,
};

export default meta;

const Template: Story<RowBoxTableProps> = (props) => (
  <RowBoxTable {...props} />
);

export const Default = Template.bind({});

Default.args = {
  columns: [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      width: 4,
    },
    {
      title: 'description',
      key: 'description',
      dataIndex: 'description',
      width: 4,
    },
  ],
  dataSource: [
    {
      name: 'test',
      description: 'test',
    },
  ],
};
