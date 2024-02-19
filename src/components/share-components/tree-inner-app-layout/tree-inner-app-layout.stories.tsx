import { Meta, Story } from '@storybook/react';

import {
  TreeInnerAppLayout,
  TreeInnerAppLayoutProps,
} from './tree-inner-app-layout';

export default {
  title: 'Share/TreeInnerAppLayout',
  component: TreeInnerAppLayout,
} as Meta;

const Template: Story<TreeInnerAppLayoutProps> = (
  args
) => <TreeInnerAppLayout {...args} />;

export const Default = Template.bind({});

Default.args = {
  treeData: [
    {
      title: 'Node1',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          key: '0-0-0',
        },
      ],
    },
  ],
};
