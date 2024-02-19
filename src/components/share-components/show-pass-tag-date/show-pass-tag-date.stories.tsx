import { Meta, Story } from '@storybook/react';

import {
  ShowPassTagDate,
  ShowPassTagDateProps,
} from './show-pass-tag-date';

const meta: Meta = {
  title: 'Share/ShowPassTagDate',
  component: ShowPassTagDate,
};

export default meta;

const Template: Story<ShowPassTagDateProps> = (props) => (
  <ShowPassTagDate {...props} />
);

export const Default = Template.bind({});

Default.args = {
  date: '2023-02-28 00:00:00',
  backgroundColor: '#F7F7F8',
};
