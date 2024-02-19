import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  ActionWrapper,
  ActionWrapperProps,
} from './action-wrapper';

export default {
  title: 'Share/ActionWrapper',
  component: ActionWrapper,
} as Meta;

const Template: Story<ActionWrapperProps> = (args) => (
  <ActionWrapper {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <EditOutlined />
      <PlusCircleOutlined className="icon-add" />
      <DeleteOutlined className="icon-delete" />
    </>
  ),
};
