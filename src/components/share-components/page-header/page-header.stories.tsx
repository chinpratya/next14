import { Meta, Story } from '@storybook/react';
import { Button } from 'antd';

import {
  PageHeader,
  PageHeaderProps,
} from './page-header';

const meta: Meta = {
  title: 'Share/PageHeader',
  component: PageHeader,
};

export default meta;

const Template: Story<PageHeaderProps> = (props) => (
  <PageHeader {...props} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'หน้าแรก',
  onBack: undefined,
};

export const WithBack = Template.bind({});

WithBack.args = {
  title: 'หน้าแรก',
  onBack: () => alert('back'),
};

export const WithExtra = Template.bind({});

WithExtra.args = {
  title: 'หน้าแรก',
  extra: <Button type="primary">บันทึก</Button>,
  onBack: undefined,
};
