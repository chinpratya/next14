import { Meta, Story } from '@storybook/react';

import {
  LoadingOverlay,
  LoadingOverlayProps,
} from './loading-overlay';

export default {
  title: 'Share/Avatar',
  component: LoadingOverlay,
} as Meta;

const Template: Story<LoadingOverlayProps> = (args) => (
  <LoadingOverlay {...args} />
);

export const Default = Template.bind({});

Default.args = {
  visible: true,
};
