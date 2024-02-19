import { Meta, Story } from '@storybook/react';

import {
  CardShowDetailProgress,
  CardShowDetailProgressProps,
} from './card-show-detail-progress';

export default {
  title: 'Components/CardShowDetailProgress',
  component: CardShowDetailProgress,
} as Meta;

const Template: Story<CardShowDetailProgressProps> = (
  args
) => <CardShowDetailProgress {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'test title',
  data: [
    {
      label:
        '1.โรงบาล 1 / โรงบาล 1.1 sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      value: 20,
    },
    { label: '2.โรงบาล 2 / โรงบาล 2.1', value: 30 },
    { label: '3.โรงบาล 3 / โรงบาล 3.1', value: 40 },
    { label: '4.โรงบาล 4 / โรงบาล 4.1', value: 50 },
  ],
};
