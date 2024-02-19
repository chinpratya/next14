import { Meta, Story } from '@storybook/react';

import {
  SelectCountry,
  SelectCountryProps,
} from './select-country';

export default {
  title: 'Components/SelectCountry',
  component: SelectCountry,
} as Meta;

const Template: Story<SelectCountryProps> = (args) => (
  <SelectCountry {...args} />
);

export const Default = Template.bind({});

Default.args = {};
