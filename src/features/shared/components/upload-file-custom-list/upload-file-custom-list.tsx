import {
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Upload,
  Button,
  UploadProps,
  Skeleton,
} from 'antd';
import type { ButtonProps } from 'antd/lib/button';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListFile } from '../../api/list-file';
import { useUploadFile } from '../../api/upload-file';

import { UploadedFileItem } from './components/uploaded-file-item';

export type UploadFileCustomListProps = ButtonProps & {
  module: string;
  group: string;
  label?: string;
  required?: boolean;
  width?: number;
  height?: number;
  title?: string;
  isRefresh?: boolean;
  disabled?: boolean;
};

export const UploadFileCustomList = ({
  module,
  group,
  disabled = false,
  label,
  type = 'link',
  required,
  width = 195,
  height = 230,
  isRefresh,
  ...props
}: UploadFileCustomListProps) => {
  const { data, isLoading, refresh, isRefreshing } =
    useListFile({
      module,
      group,
      env: 'public',
    });

  const uploadFile = useUploadFile({
    module,
    group,
    mode: 'public',
  });

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  const uploadProps: UploadProps = {
    onChange: ({ file }) => {
      if (file.originFileObj) {
        uploadFile.submit(file.originFileObj);
      }
    },
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: !disabled,
    },
    fileList: [],
    disabled: disabled ?? uploadFile.isLoading,
  };

  return (
    <>
      {isRefresh ? (
        <Flex justify="flex-end" className="mb-4">
          <Button onClick={() => refresh()}>
            <ReloadOutlined
              spin={isRefreshing}
              style={{
                width: 16.5,
                height: 16.5,
              }}
            />
          </Button>
        </Flex>
      ) : null}
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        `}
      >
        <Upload {...uploadProps} disabled={disabled}>
          <Button
            loading={uploadFile.isLoading}
            icon={<UploadOutlined />}
            type={type}
            disabled={disabled}
            className={css`
              width: ${width}px;
              margin: 0 10px 10px 0;
              height: ${height}px !important;
              padding: 0 !important;
            `}
            {...props}
          >
            {label ?? (
              <IntlMessage id={tokens.common.upload} />
            )}
            {required ? (
              <span className="text-danger ml-1">*</span>
            ) : null}
          </Button>
        </Upload>
        {data?.map((file) => (
          <UploadedFileItem
            key={`uploaded-file-${group}-${module}-${file.key}`}
            module={module}
            group={group}
            file={file.url}
            width={width}
          />
        ))}
      </div>
    </>
  );
};
