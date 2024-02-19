import { Meta, Story } from '@storybook/react';

import { Link, LinkProps } from './link';

export default {
  title: 'Share/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <Link {...args} />
);

export const Default = Template.bind({});

Default.args = {
  href: '/',
  children: <>ถัดไป</>,
};
