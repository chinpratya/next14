import { Meta, Story } from '@storybook/react';

import {
  UploadImage,
  UploadImageProps,
} from './upload-image';

export default {
  title: 'Components/UploadImage',
  component: UploadImage,
} as Meta;

const Template: Story<UploadImageProps> = (args) => (
  <UploadImage {...args} />
);

export const Default = Template.bind({});

Default.args = {};
