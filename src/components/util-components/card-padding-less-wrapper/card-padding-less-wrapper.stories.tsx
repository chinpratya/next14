import { Meta, Story } from '@storybook/react';

import {
  CardPaddingLessWrapper,
  CardPaddingLessWrapperProps,
} from './card-padding-less-wrapper';

export default {
  title: 'Util/CardPaddingLessWrapper',
  component: CardPaddingLessWrapper,
} as Meta;

const Template: Story<CardPaddingLessWrapperProps> = (
  args
) => <CardPaddingLessWrapper {...args} />;

export const Default = Template.bind({});

Default.args = {};
