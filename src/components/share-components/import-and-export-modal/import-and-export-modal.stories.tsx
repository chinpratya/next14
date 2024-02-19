import { Meta, Story } from '@storybook/react';
import { RcFile } from 'antd/lib/upload';

import {
  ImportAndExportModal,
  ImportAndExportModalProps,
} from './import-and-export-modal';

export default {
  title: 'Components/ImportAndExportModal',
  component: ImportAndExportModal,
} as Meta;

const Template: Story<ImportAndExportModalProps> = (
  args
) => <ImportAndExportModal {...args} />;

export const Default = Template.bind({});

const columns = [
  {
    title: 'ชื่อแบบประเมิน',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ประเภทแบบประเมิน',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'คำถาม 1',
    dataIndex: 'que',
    key: 'que',
  },
  {
    title: 'ประเภทคำถาม',
    dataIndex: 'queType',
    key: 'queType',
  },
  {
    title: 'ตัวเลือก',
    dataIndex: 'choices',
    key: 'choices',
  },
];

const dataSource = [
  {
    name: 'บริษัท ซีเคียวริตี้ พิทช์ จำกัด',
    type: 'องค์การมหาชน',
    que: 'เทคโนโลยี',
    queType: 'กลุ่มคำถาม',
    choices: 'ใช่',
  },
];

Default.args = {
  dataSource,
  columns,
  open: true,
  onToggle: () => null,
  isLoading: true,
  onUploadFile: (datafile: RcFile) =>
    console.log('datafile', datafile),
};
