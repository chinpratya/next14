import { Meta, Story } from '@storybook/react';

import {
  UploadImageLogo,
  UploadImageLogoProps,
} from './upload-image-logo';

export default {
  title: 'Components/UploadImage',
  component: UploadImageLogo,
} as Meta;

const Template: Story<UploadImageLogoProps> = (args) => (
  <UploadImageLogo {...args} />
);

export const Default = Template.bind({});

Default.args = {};
