import { UploadOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Upload } from 'antd';
import type { ButtonProps } from 'antd/lib/button';

import {
  useDeleteFile,
  useUploadFile,
} from '@/shared/upload';
import { UploadPresigned } from '@/types';

export type UploadButtonProps = ButtonProps & {
  value?: string;
  onChange?: (value: string) => void;
  module: string;
  group: string;
  label?: string;
  required?: boolean;
};

export const UploadButton = ({
  value,
  onChange,
  label,
  module,
  group,
  type = 'link',
  required,
  disabled,
  ...props
}: UploadButtonProps) => {
  const onUploadFinish = (presigned: UploadPresigned) => {
    onChange?.(`${presigned.url}${presigned.key}`);
  };

  const deleteFile = useDeleteFile({
    module,
    group,
    mode: 'public',
  });
  const uploadFile = useUploadFile({
    module,
    group,
    mode: 'public',
    onSuccess: onUploadFinish,
  });

  return (
    <Upload
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;

        .ant-upload-list {
          display: ${!value ? 'none' : 'flex'} !important;
          flex-direction: column;
          margin-bottom: 8px;

          ::before {
            display: none !important;
          }

          .ant-upload-list-item {
            margin-top: 0;
            cursor: pointer;

            a {
              color: ${disabled ? '#ccc' : ''};
            }
          }

          .ant-upload-list-text-container {
            ::before {
              display: none !important;
            }
          }
        }
      `}
      onRemove={(uploadFile) => {
        deleteFile.submit(uploadFile.name);
        onChange?.('');
      }}
      onChange={({ file }) => {
        if (file.originFileObj) {
          uploadFile.submit(file.originFileObj);
        }
      }}
      showUploadList={{
        showPreviewIcon: false,
        showRemoveIcon: !disabled,
      }}
      fileList={
        value
          ? [
              {
                uid: value,
                name: value.split('/').reverse()[0],
                status: 'done',
                url: value,
              },
            ]
          : []
      }
    >
      <Button
        loading={uploadFile.isLoading}
        icon={<UploadOutlined />}
        type={type}
        className="p-2"
        disabled={disabled}
        {...props}
      >
        {label ?? 'Upload'}
        {required ? (
          <span className="text-danger ml-1">*</span>
        ) : null}
      </Button>
    </Upload>
  );
};
