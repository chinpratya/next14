import {
  CameraOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
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
import { css } from '@emotion/css';

export type UploadImageLogoProps = Pick<
  UseUploadFile,
  'module' | 'group'
> & {
  value?: string;
  accept?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const UploadImageLogo = ({
  value,
  onChange,
  module,
  group,
  accept,
  disabled = false,
}: UploadImageLogoProps) => {
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
        disabled={uploadFile.isLoading || disabled}
        onChange={handleUpload}
      >
        <Flex justify="center">
          <div
            className={css`
              position: relative;
              .upload-logo-template {
                position: absolute;
                z-index: 1;
                display: none !important;
                height: 30px !important;
                width: 30px !important;
                cursor: ${disabled
                  ? 'not-allowed'
                  : 'pointer'} !important;
              }
              .logo-template {
                z-index: -1;
                cursor: ${disabled
                  ? 'not-allowed'
                  : 'pointer'} !important;
              }
              :hover {
                .upload-logo-template {
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center !important;
                  position: absolute;
                  height: 30px !important;
                  width: 30px !important;
                  left: 40% !important;
                  bottom: 10px !important;
                  background-color: #d9d9d9;
                  color: black;
                  border-radius: 50% !important;
                }
                .logo-template {
                  filter: blur(0.1rem);
                }
              }
            `}
          >
            {uploadFile.isLoading ? (
              <div
                className={css`
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center !important;
                  height: 50px;
                `}
              >
                <LoadingOutlined
                  className={css`
                    font-size: 35px;
                  `}
                />
              </div>
            ) : (
              <>
                <Image
                  src={value}
                  alt="incident form logo"
                  preview={false}
                  height={50}
                  className="logo-template"
                />

                <div className="upload-logo-template">
                  <CameraOutlined />
                </div>
              </>
            )}
          </div>
        </Flex>
      </Upload>
    </>
  );
};
