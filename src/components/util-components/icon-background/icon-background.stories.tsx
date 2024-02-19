import { ContainerOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  IconBackground,
  IconBackgroundProps,
} from './icon-background';

export default {
  title: 'Util/IconBackground',
  component: IconBackground,
} as Meta;

const Template: Story<IconBackgroundProps> = (args) => (
  <IconBackground {...args} />
);

export const Default = Template.bind({});

Default.args = {
  icon: <ContainerOutlined />,
};
