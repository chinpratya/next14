import { Meta, Story } from '@storybook/react';

import {
  DropdownRender,
  DropdownRenderProps,
} from './dropdown-render';

const meta: Meta = {
  title: 'Share/DropdownRender',
  component: DropdownRender,
};

export default meta;

const Template: Story<DropdownRenderProps> = (props) => (
  <DropdownRender {...props} />
);

export const Default = Template.bind({});

Default.args = {};
