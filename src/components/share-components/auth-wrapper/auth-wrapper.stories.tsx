import { Meta, Story } from '@storybook/react';

import {
  AuthWrapper,
  AuthWrapperProps,
} from './auth-wrapper';
import { SimpleForm } from './simple-form';

export default {
  title: 'Share/AuthWrapper',
  component: AuthWrapper,
} as Meta;

const Template: Story<AuthWrapperProps> = (args) => (
  <AuthWrapper {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Log in to OneFence',
  description:
    'Enter the email address you use to log in',
  children: <SimpleForm />,
};
