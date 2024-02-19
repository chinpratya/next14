import { Meta, Story } from '@storybook/react';

import { Avatar, AvatarProps } from './avatar';

export default {
  title: 'Share/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <Avatar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/32.jpg',
};

export const WithoutImage = Template.bind({});

WithoutImage.args = {
  src: '',
};
