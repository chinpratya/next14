import { Meta, Story } from '@storybook/react';

import { FileUploadType } from '../../../features/compliance/assessment-inventory/types';

import {
  UploadFile,
  UploadFileProps,
  // FileUploadType,
} from './upload-file';

export default {
  title: 'Components/UploadFile',
  component: UploadFile,
} as Meta;

const Template: Story<UploadFileProps> = (args) => (
  <UploadFile {...args} />
);

export const Default = Template.bind({});

export type UploadType = {
  fileID: string;
  fileName: string;
};

const onAddFile = (fileID: string, fileName: string) => {
  console.log('onAddFile', fileID, fileName);
};
const onDelete = (id: string) => {
  console.log('onDelete', id);
};

let fileLists;

const setfileList = (fileList: FileUploadType[]) => {
  fileLists = fileList;
};
Default.args = {
  isLoading: true,
  isLoadingDelete: true,
  onAddFile,
  onDelete,
  fileList: fileLists,
  setFileList: setfileList,
};
