import {
  InboxOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';

import { FileUploadType } from '../../../features/compliance/assessment-inventory/types';

const { Dragger } = Upload;

export type UploadFileProps = {
  isLoading: boolean;
  isLoadingDelete: boolean;
  onDelete: (id: string) => void;
  onAddFile: (fileID: string, fileName: string) => void;
  fileList: FileUploadType[];
  setFileList: (fileList: FileUploadType[]) => void;
  type: string;
  moduleName: string;
  group: string;
  expriesIn: number;
};

export const UploadFile = ({
  isLoading,
  isLoadingDelete,
  onDelete,
  onAddFile,
  fileList,
  setFileList,
  moduleName,
  group,
  expriesIn,
}: UploadFileProps) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    disabled: isLoading || isLoadingDelete,
    onChange(info) {
      setFileList(info.fileList);
      console.log('onChange files', info);
    },
    beforeUpload(e) {
      const payload = {
        module: moduleName,
        group: group,
        file_name: e.name,
        file_extension: e.type,
        expires_in: expriesIn,
      };
      console.log(payload);

      // submit({ payload, file: e });
      onAddFile(e.uid, e.name);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove(e) {
      onDelete(e.uid);
      // console.log('onRemove files', e);
    },
  };
  return (
    <Dragger
      {...props}
      className={css`
        margin: auto !important;
      `}
    >
      {isLoading || isLoadingDelete ? (
        <LoadingOutlined
          className={css`
            font-size: 50px;
          `}
        />
      ) : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p
            className={css`
              margin: 10px auto !important;
            `}
          >
            คลิกหรือลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
          </p>
          <p
            className={css`
              margin: 10px auto !important;
            `}
          >
            รองรับการอัปโหลดครั้งเดียวหรือเป็นกลุ่ม
          </p>
        </>
      )}
    </Dragger>
  );
};
