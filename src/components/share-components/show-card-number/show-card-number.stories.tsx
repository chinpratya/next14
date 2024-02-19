import { Meta, Story } from '@storybook/react';

import { ShowCardNumber } from './show-card-number';

const meta: Meta = {
  title: 'Share/ShowCardNumber',
};

export default meta;

const Template: Story = (props) => (
  <ShowCardNumber number={0} title={''} {...props} />
);

export const Default = Template.bind({});

Default.args = {
  number: 10,
  title: 'หน้าแรก',
  annotation: 'count',
};

export const WithoutAnnotation = Template.bind({});

WithoutAnnotation.args = {
  number: 10,
  title: 'หน้าแรก',
};
