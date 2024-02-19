import { UploadOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Image,
  Typography,
  Upload,
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';

import { tokens } from '@/lang';
import {
  useUploadFile,
  UseUploadFile,
} from '@/shared/upload';
import { IntlMessage } from '@utilComponents/intl-message';

export type UploadImageProps = Pick<
  UseUploadFile,
  'module' | 'group'
> & {
  value?: string;
  accept?: string;
  recommendedText?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export const UploadImage = ({
  value,
  onChange,
  module,
  group,
  accept,
  defaultValue,
  recommendedText,
}: UploadImageProps) => {
  const uploadFile = useUploadFile({
    module,
    group,
    onSuccess: (presigned) => {
      onChange?.(presigned.url + presigned.key);
    },
  });

  const handleUpload: UploadProps['onChange'] = (
    info
  ) => {
    if (info.fileList.length > 0) {
      uploadFile.submit(
        info.fileList[0].originFileObj as RcFile
      );
    }
  };

  return (
    <>
      <Upload
        fileList={[]}
        beforeUpload={() => false}
        accept={accept}
        disabled={uploadFile.isLoading}
        onChange={handleUpload}
      >
        <Flex align="center" className="mb-4" gap={4}>
          <Typography.Text>
            <IntlMessage
              id={tokens.components.uploadImage.label}
            />{' '}
            :{' '}
          </Typography.Text>
          <Button
            loading={uploadFile.isLoading}
            icon={<UploadOutlined />}
          >
            <IntlMessage
              id={tokens.components.uploadImage.button}
            />
          </Button>
        </Flex>
      </Upload>
      {(value || defaultValue) && (
        <Card
          className={css`
            .ant-card-body {
              padding: 12px;
            }
          `}
        >
          <Image
            style={{ maxHeight: 100 }}
            className="mb-2"
            src={value ?? defaultValue}
            alt="image"
          />
        </Card>
      )}
      <div className="mb-4" />
      <Typography.Text>
        {recommendedText ?? (
          <IntlMessage
            id={
              tokens.components.uploadImage
                .recommendedSize
            }
          />
        )}
      </Typography.Text>
    </>
  );
};
