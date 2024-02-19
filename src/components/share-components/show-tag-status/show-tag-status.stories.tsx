import { Meta, Story } from '@storybook/react';

import {
  ShowTagStatus,
  ShowTagStatusProps,
} from './show-tag-staus';

const meta: Meta = {
  title: 'Share/ShowTagStatus',
  component: ShowTagStatus,
};

export default meta;

const Template: Story<ShowTagStatusProps> = (props) => (
  <ShowTagStatus {...props} />
);

export const Default = Template.bind({});

Default.args = {
  status: 'Low',
  items: [
    {
      label: 'Critical',
      key: 'Critical',
      color: '#E52917',
    },
    {
      label: 'High',
      key: 'High',
      color: '#F59729',
    },
    {
      label: 'Medium',
      key: 'Medium',
      color: '#F1D43B',
    },
    {
      label: 'Low',
      key: 'Low',
      color: '#89F746',
    },
  ],
};
