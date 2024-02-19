import { css } from '@emotion/css';
import { Upload, Spin } from 'antd';
import { RcFile } from 'antd/es/upload';

import { Logo } from '@components/logo';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUploadFile } from '../../api/upload-file';

const { Dragger } = Upload;

type UploadAvatarProps = {
  value?: string;
  onChange?: (url: string) => void;
  disabled?: boolean;
};

export const UploadAvatar = ({
  value,
  onChange,
  disabled = false,
}: UploadAvatarProps) => {
  const uploadFile = useUploadFile({
    module: 'organizations',
    group: 'user',
    onSuccess: (presigned) => {
      const url = `${presigned.url}${presigned.key}`;
      onChange?.(url);
    },
  });

  const handleBeforeUpload = (file: File) => {
    const reader = new FileReader();

    uploadFile.submit(file as RcFile);

    reader.readAsDataURL(file);
    return false;
  };

  return (
    <>
      <Dragger
        multiple={false}
        maxCount={1}
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
        className={css`
          border: none !important;
          width: 250px !important;
          margin: auto !important;
        `}
        disabled={disabled || uploadFile.isLoading}
      >
        {uploadFile.isLoading ? (
          <Spin
            tip="loading..."
            size="large"
            className={css`
              border: none !important;
              width: 180px !important;
              height: 200px !important;
              margin: auto !important;
              margin-top: 40px !important;
              padding-top: 40px !important;
              border-radius: 50%;

              .ant-spin-dot {
                margin-bottom: 20px !important;
              }
            `}
          />
        ) : (
          <Logo src={value} preview={false} />
        )}
        {!value ? (
          <p
            className={css`
              margin: 10px auto !important;
            `}
          >
            <IntlMessage id="profile.setting.basicInfo.upload" />
          </p>
        ) : null}
      </Dragger>
    </>
  );
};
