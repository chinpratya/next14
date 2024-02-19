import '@/styles/light-theme.css';
import { Meta, Story } from '@storybook/react';

import { Loading, LoadingProps } from './loading';

const meta: Meta = {
  title: 'Share/Loading',
  component: Loading,
};

export default meta;

const Template: Story<LoadingProps> = (props) => (
  <Loading {...props} />
);

export const Default = Template.bind({});

Default.args = {
  align: 'center',
  cover: 'inline',
};
