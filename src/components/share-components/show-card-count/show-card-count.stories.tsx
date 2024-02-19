import { DashboardOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  ShowCardCount,
  ShowCardCountProps,
} from './show-card-count';

export default {
  title: 'Share/ShowCardCount',
  component: ShowCardCount,
} as Meta;

const Template: Story<ShowCardCountProps> = (args) => (
  <ShowCardCount {...args} />
);

export const Default = Template.bind({});

Default.args = {
  number: 10,
  icon: <DashboardOutlined />,
  title: 'test',
};
