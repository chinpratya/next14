import { Meta, Story } from '@storybook/react';

import {
  CardDescription,
  CardDescriptionProps,
} from './card-description';

export default {
  title: 'Components/CardDescription',
  component: CardDescription,
} as Meta;

const Template: Story<CardDescriptionProps> = (args) => (
  <CardDescription {...args} />
);

export const Default = Template.bind({});

Default.args = {
  createdDt: '2023-01-10 10:00:00',
  createdBy: 'admin',
  updatedDt: '2023-01-10 10:00:00',
};
