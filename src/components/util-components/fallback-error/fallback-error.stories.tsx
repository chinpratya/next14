import { Meta, Story } from '@storybook/react';

import {
  FallbackError,
  FallbackErrorProps,
} from './fallback-error';

export default {
  title: 'Util/FallbackError',
  component: FallbackError,
} as Meta;

const Template: Story<FallbackErrorProps> = (args) => (
  <FallbackError {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isError: true,
  children: <div>Children</div>,
};
