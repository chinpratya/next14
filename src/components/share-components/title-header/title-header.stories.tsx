import { ContainerOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';

import {
  TitleHeader,
  TitleHeaderProps,
} from './title-header';

const meta: Meta = {
  title: 'Share/TitleHeader',
  component: TitleHeader,
};

export default meta;

const Template: Story<TitleHeaderProps> = (props) => (
  <TitleHeader {...props} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'pdpakit',
  icon: <ContainerOutlined />,
  // breadcrumb: [
  //   {
  //     title: 'apps',
  //     path: '/apps',
  //   },
  //   {
  //     title: 'pdpakit',
  //     path: `/apps/pdpakit`,
  //   },
  // ],
};
