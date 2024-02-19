import {
  UploadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { ButtonProps } from 'antd/lib/button';
import _ from 'lodash';

import {
  PresignedUpload,
  useDeleteFile,
  useUploadFile,
} from '@/features/shared';

export type UploadFileBasisPurposeProps = ButtonProps & {
  value?: string[];
  onChange?: (value: string[]) => void;
  module: string;
  group: string;
  label?: string;
  required?: boolean;
  onUpload?: (isloading: boolean) => void;
};

export const UploadFileBasisPurpose = ({
  value,
  onChange,
  module,
  group,
  disabled,
  onUpload,
}: UploadFileBasisPurposeProps) => {
  const onUploadFinish = (presigned: PresignedUpload) => {
    const file = value
      ? [...value, `${presigned.url}${presigned.key}`]
      : [`${presigned.url}${presigned.key}`];
    onChange?.(file);
    onUpload?.(false);
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
        console.log('Upload', uploadFile);
        const newFileList = _.filter(
          value,
          (v) => v !== uploadFile.uid
        );
        onChange?.(newFileList);
      }}
      onChange={({ file }) => {
        if (file.originFileObj) {
          onUpload?.(true);
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
    >
      {uploadFile.isLoading ? (
        <LoadingOutlined />
      ) : (
        <Button>
          <p>
            <UploadOutlined /> Click to upload
          </p>
        </Button>
      )}
    </Upload>
  );
};
