import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  DeleteModal,
  DeleteModalProps,
} from './delete-modal';

export default {
  title: 'Share/DeleteModal',
  component: DeleteModal,
} as Meta;

const Template: Story<DeleteModalProps> = (args) => (
  <DeleteModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  open: false,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  open: false,
  hasIdentifier: false,
  icon: (
    <ExclamationCircleOutlined className="text-danger" />
  ),
};

export const CustomContent = Template.bind({});

CustomContent.args = {
  open: false,
  hasIdentifier: false,
  width: 500,
  icon: (
    <ExclamationCircleOutlined className="text-danger" />
  ),
  title: 'คุณต้องการออกจากระบบ Mac หรือไม่',
  content:
    'การดำเนินการนี้จะทำให้คุณไม่สามารถเข้าสู่ระบบด้วย Mac ได้อีกต่อไป จนกว่าจะทำการเข้าสู่ระบบด้วยอุปกรณ์ Mac อีกครั้ง',
};
