import { Meta, Story } from '@storybook/react';

import { NoneProfile } from './none-profile';

const meta: Meta = {
  title: 'Share/NoneProfile',
  component: NoneProfile,
};

export default meta;

const Template: Story = (props) => (
  <NoneProfile {...props} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Admin',
};
