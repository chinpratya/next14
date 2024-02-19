import { Meta, Story } from '@storybook/react';

import { CkEditor, CkEditorProps } from './ck-editor';

export default {
  title: 'Components/CkEditor',
  component: CkEditor,
} as Meta;

const Template: Story<CkEditorProps> = (args) => (
  <CkEditor {...args} />
);

export const Default = Template.bind({});

Default.args = {};
