import { Meta, Story } from '@storybook/react';

import { BrandHero, BrandHeroProps } from './brand-hero';

export default {
  title: 'Share/BrandHero',
  component: BrandHero,
} as Meta;

const Template: Story<BrandHeroProps> = (args) => (
  <BrandHero {...args} />
);

export const Default = Template.bind({});

Default.args = {};
