import { Meta, Story } from '@storybook/react';
import { Button, Typography } from 'antd';

import {
  DescriptionBlock,
  DescriptionBlockProps,
} from './description-block';

export default {
  title: 'Share/DescriptionBlock',
  component: DescriptionBlock,
} as Meta;

const Template: Story<DescriptionBlockProps> = (args) => (
  <DescriptionBlock {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'ชื่อบริษัท',
  description: (
    <Typography.Text>
      บริษัท ซีเอ็นเอส จำกัด (มหาชน)
    </Typography.Text>
  ),
  extra: <Button type="link">แก้ไข</Button>,
};

export const WithValue = Template.bind({});

WithValue.args = {
  title: 'ชื่อบริษัท',
  value: 'บริษัท ซีเอ็นเอส จำกัด (มหาชน)',
  extra: <Button type="link">แก้ไข</Button>,
};
