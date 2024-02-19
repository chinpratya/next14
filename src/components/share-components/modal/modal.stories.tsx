import '@/styles/light-theme.css';
import { Meta, Story } from '@storybook/react';
import { ModalProps } from 'antd';

import { Modal } from './modal';

const meta: Meta = {
  title: 'Share/Modal',
  component: Modal,
};

export default meta;

const Template: Story<ModalProps> = (props) => (
  <Modal {...props} />
);

export const Default = Template.bind({});

Default.args = {
  open: false,
  title: 'Modal Title',
  children: 'Modal Content',
};
