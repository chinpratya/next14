import { FileDoneOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  DescriptionIcon,
  DescriptionIconProps,
} from './description-icon';

export default {
  title: 'Share/DescriptionIcon',
  component: DescriptionIcon,
} as Meta;

const Template: Story<DescriptionIconProps> = (args) => (
  <DescriptionIcon {...args} />
);

export const Default = Template.bind({});

Default.args = {
  icon: <FileDoneOutlined />,
  label: 'name',
  data: 'xxx',
};
