import { Meta, Story } from '@storybook/react';

import { Logo, LogoProps } from './logo';

export default {
  title: 'Share/Logo',
  component: Logo,
} as Meta;

const Template: Story<LogoProps> = (args) => (
  <Logo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  src: 'https://picsum.photos/200/200',
};

export const FallBack = Template.bind({});

FallBack.args = {
  src: 'error',
};
