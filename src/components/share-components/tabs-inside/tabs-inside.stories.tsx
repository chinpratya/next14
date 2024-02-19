import { Meta, Story } from '@storybook/react';

import { PageHeader } from '@components/page-header';

import {
  TabsInside,
  TabsInsideProps,
} from './tabs-inside';

export default {
  title: 'Share/TabsInside',
  component: TabsInside,
} as Meta;

const Template: Story<TabsInsideProps> = (args) => (
  <div style={{ padding: 24 }}>
    <PageHeader title="Tabs Inside" />
    <TabsInside {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      key: 'basic-info',
      label: 'ข้อมูลพื้นฐาน',
      children: <h1>ข้อมูลพื้นฐาน</h1>,
    },
    {
      key: 'customize',
      label: 'ปรับแต่งเว็บฟอร์ม',
      children: <h1>ปรับแต่งเว็บฟอร์ม</h1>,
    },
    {
      key: 'organization',
      label: 'องค์กร',
      children: <h1>องค์กร</h1>,
    },
    {
      key: 'score',
      label: 'ตั้งค่าคะแนน',
      children: <h1>ตั้งค่าคะแนน</h1>,
    },
    {
      key: 'logic',
      label: 'Logic',
      children: <h1>Logic</h1>,
    },
  ],
};
