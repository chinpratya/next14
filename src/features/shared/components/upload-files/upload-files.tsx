import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import type { ButtonProps } from 'antd/lib/button';
import _ from 'lodash';

import {
  PresignedUpload,
  useDeleteFile,
  useUploadFile,
} from '@/features/shared';

export type UploadFilesProps = ButtonProps & {
  value?: string[];
  onChange?: (value: string[]) => void;
  module: string;
  group: string;
  label?: string;
  required?: boolean;
};

export const UploadFiles = ({
  value,
  onChange,
  module,
  group,
  disabled,
  label,
  type = 'link',
  required,
  ...props
}: UploadFilesProps) => {
  const onUploadFinish = (presigned: PresignedUpload) => {
    const file = value
      ? [...value, `${presigned.url}${presigned.key}`]
      : [`${presigned.url}${presigned.key}`];
    onChange?.(file);
  };

  const deleteFile = useDeleteFile({
    module,
    group,
    env: 'public',
  });
  const uploadFile = useUploadFile({
    module,
    group,
    mode: 'public',
    onSuccess: onUploadFinish,
  });

  return (
    <Upload
      onRemove={(uploadFile) => {
        deleteFile.submit(uploadFile.name);
        const newFileList = _.filter(
          value,
          (v) => v !== uploadFile.uid
        );
        onChange?.(newFileList);
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
          ? _.map(value, (v) => {
              return {
                uid: v,
                name: v.split('/').reverse()[0],
                status: 'done',
                url: v,
              };
            })
          : []
      }
      disabled={disabled || uploadFile.isLoading}
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
