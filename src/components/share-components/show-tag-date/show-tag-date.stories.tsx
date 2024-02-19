import { Meta, Story } from '@storybook/react';

import {
  ShowTagDate,
  ShowTagDateProps,
} from './show-tag-date';

const meta: Meta = {
  title: 'Share/ShowTagDate',
  component: ShowTagDate,
};

export default meta;

const Template: Story<ShowTagDateProps> = (props) => (
  <ShowTagDate {...props} />
);

export const Default = Template.bind({});

Default.args = {
  date: '2023-02-28 00:00:00',
  backgroundColor: '#F7F7F8',
};
