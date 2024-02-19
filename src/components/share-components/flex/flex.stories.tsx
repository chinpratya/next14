import '@/styles/light-theme.css';
import { Meta, Story } from '@storybook/react';

import { Flex, FlexProps } from './flex';

const meta: Meta = {
  title: 'Share/Flex',
  component: Flex,
};

export default meta;

const Template: Story<FlexProps> = (props) => (
  <Flex {...props} />
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <h1>Flex 1</h1>
      <h1>Flex 2</h1>
      <h1>Flex 3</h1>
    </>
  ),
};
