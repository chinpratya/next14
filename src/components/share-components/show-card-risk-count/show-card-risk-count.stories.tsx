import { Meta, Story } from '@storybook/react';

import { ShowCardRiskCount } from './show-card-risk-count';

const meta: Meta = {
  title: 'Share/ShowCardRisk',
};

export default meta;

const Template: Story = (props) => (
  <ShowCardRiskCount number={0} {...props} />
);

export const Default = Template.bind({});

Default.args = {
  number: 10,
  annotation: 'count',
  background: 'red',
};

export const WithoutAnnotation = Template.bind({});

WithoutAnnotation.args = {
  number: 10,
  background: 'red',
};
