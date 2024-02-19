import { Meta, Story } from '@storybook/react';

import { DataUsage, DataUsageProps } from './data-usage';

export default {
  title: 'Share/DataUsage',
  component: DataUsage,
} as Meta;

const Template: Story<DataUsageProps> = (args) => (
  <DataUsage {...args} />
);

export const Default = Template.bind({});

Default.args = {
  used: 20.45,
  total: 100,
};
