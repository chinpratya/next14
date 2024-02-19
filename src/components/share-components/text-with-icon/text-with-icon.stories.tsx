import { FileDoneOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  TextWithIcon,
  TextWithIconProps,
} from './text-with-icon';

export default {
  title: 'Share/TextWithIcon',
  component: TextWithIcon,
} as Meta;

const Template: Story<TextWithIconProps> = (args) => (
  <TextWithIcon {...args} />
);

export const Default = Template.bind({});

Default.args = {
  tag: 'tag',
  title: 'title',
  icon: <FileDoneOutlined />,
  onClick: undefined,
};

export const WithOnClick = Template.bind({});

WithOnClick.args = {
  tag: 'tag',
  title: 'title',
  icon: <FileDoneOutlined />,
};
