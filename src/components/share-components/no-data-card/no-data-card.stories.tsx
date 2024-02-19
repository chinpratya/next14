import { Meta, Story } from '@storybook/react';

import {
  NoDataCard,
  NoDataCardProps,
} from './no-data-card';

export default {
  title: 'Share/NoDataCard',
  component: NoDataCard,
} as Meta;

const Template: Story<NoDataCardProps> = (args) => (
  <NoDataCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'หัวข้อ',
  description: 'รายละเอียด',
};
