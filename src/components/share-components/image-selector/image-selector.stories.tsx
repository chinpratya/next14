import { Meta, Story } from '@storybook/react';

import {
  ImageSelector,
  ImageSelectorProps,
} from './image-selector';

export default {
  title: 'Components/ImageSelector',
  component: ImageSelector,
} as Meta;

const Template: Story<ImageSelectorProps> = (args) => (
  <ImageSelector {...args} />
);

export const Default = Template.bind({});

let src = '';

const onChange = (value: string) => {
  src = value;
  console.log('onChange', src);
};
Default.args = {
  value: src,
  onChange,
  options: [
    {
      value: '/img/logo.png',
      src: '/img/logo-hits-sm.png',
    },
    {
      value: '/img/logo.png',
      src: '/img/logo.png',
    },
  ],
};
