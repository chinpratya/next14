import { Meta, Story } from '@storybook/react';

import {
  TableSelection,
  TableSelectionProps,
} from './table-selection';

export default {
  title: 'Components/TableSelection',
  component: TableSelection,
} as Meta;

const Template: Story<TableSelectionProps> = (args) => (
  <TableSelection {...args} />
);

export const Default = Template.bind({});

Default.args = {};
