import { InboxOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Form, Upload, FormInstance } from 'antd';
import type { UploadProps } from 'antd';
import { useEffect, useState } from 'react';

const { Dragger } = Upload;

import {
  AssessmentInventory,
  FileUploadType,
} from '../../types';

type DocumentationContentProps = {
  data: AssessmentInventory | null;
  form: FormInstance;
  loading: boolean;
};
export const DocumentationDuplicateContent = ({
  data,
  form,
  loading,
}: DocumentationContentProps) => {
  const [fileList, setFileList] = useState<
    FileUploadType[]
  >([]);

  useEffect(() => {
    if (data) {
      const dataFiles =
        data?.files?.map((file) => {
          return {
            uid: file.fileID,
            name: file.fileName,
          };
        }) ?? [];
      setFileList(dataFiles);
    }
  }, [data]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
  };

  return (
    <Card
      title="เอกสารประกอบ"
      className={css`
        width: 100%;
      `}
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="files">
          <Dragger
            {...props}
            className={css`
              margin: auto !important;
            `}
          >
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
          </Dragger>
        </Form.Item>
      </Form>
    </Card>
  );
};
