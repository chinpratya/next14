import { Meta, Story } from '@storybook/react';

import {
  PageNotFound,
  PageNotFoundProps,
} from './page-not-found';

export default {
  title: 'Util/PageNotFound',
  component: PageNotFound,
} as Meta;

const Template: Story<PageNotFoundProps> = (args) => (
  <PageNotFound {...args} />
);

export const Default = Template.bind({});

Default.args = {
  withLayout: false,
};
