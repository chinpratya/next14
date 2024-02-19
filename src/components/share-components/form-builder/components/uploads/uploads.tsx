import {
  InboxOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useSetState } from '@mantine/hooks';
import { Button, Upload as AntdUpload } from 'antd';
import type {
  UploadProps as AntdUploadProps,
  UploadFile,
} from 'antd';
import { produce } from 'immer';
import { useEffect } from 'react';

import {
  useDeleteFile,
  useUploadFile,
} from '@/shared/upload';
import { UploadPresigned } from '@/types';
import { DeleteModal } from '@components/delete-modal';

export type UploadsProps = Omit<
  AntdUploadProps,
  'fileList' | 'onChange'
> & {
  fileList?: string[];
  uploadStyle?: 'drag' | 'button';
  onChange?: (fileList: string[]) => void;
  readOnly?: boolean;
};

export const Uploads = ({
  fileList = [],
  uploadStyle = 'button',
  onChange,
  readOnly,
  ...props
}: UploadsProps) => {
  const [state, setState] = useSetState<{
    fileList: AntdUploadProps['fileList'] | null;
    currentFile: UploadFile | null;
    isOpenDeleteModal: boolean;
  }>({
    fileList: null,
    currentFile: null,
    isOpenDeleteModal: false,
  });

  const onUploadFinish = (presigned: UploadPresigned) => {
    const file = `${presigned.url}${presigned.key}`;
    onChange?.([...(fileList ?? []), file]);
    setState({
      fileList: produce(state.fileList, (draft) => {
        const index =
          draft?.findIndex(
            (f) => f.status === 'uploading'
          ) ?? -1;
        if (index !== -1) {
          draft?.splice(index, 1, {
            uid: draft[index].uid,
            name: file.split('/').reverse()[0],
            status: 'done',
            url: file,
          });
        }
        return draft;
      }),
    });
  };

  const uploadFile = useUploadFile({
    module: 'consent',
    group: 'form-builder',
    mode: 'public',
    onSuccess: onUploadFinish,
  });

  const onDeleteSuccess = () => {
    onChange?.(
      fileList.filter((f) => f !== state.currentFile?.url)
    );
    setState({
      fileList: state.fileList?.filter(
        (f) => f.uid !== state.currentFile?.uid
      ),
      currentFile: null,
      isOpenDeleteModal: false,
    });
  };

  const deleteFile = useDeleteFile({
    module: 'consent',
    group: 'form-builder',
    mode: 'public',
    onSuccess: onDeleteSuccess,
  });

  const uploadProps: AntdUploadProps = {
    ...props,
    multiple: false,
    fileList: state.fileList ?? undefined,
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
    },
    onChange: ({ file }) => {
      const index =
        state.fileList?.findIndex(
          (f) => f.uid === file.uid
        ) ?? -1;
      if (file.originFileObj && index === -1) {
        uploadFile.submit(file.originFileObj);
        setState({
          fileList: [
            ...(state.fileList ?? []),
            {
              uid: file.uid,
              name: file.name,
              status: 'uploading',
            },
          ],
        });
      }
    },
    onRemove: async (file) => {
      setState({
        currentFile: file,
        isOpenDeleteModal: true,
      });
    },
  };

  useEffect(() => {
    if (state.fileList === null && fileList?.length) {
      setState({
        fileList: fileList?.map((file) => ({
          uid: file,
          name: file.split('/').reverse()[0],
          status: 'done',
          url: file,
        })),
      });
    }
  }, [state.fileList, fileList, setState]);

  return (
    <>
      {uploadStyle === 'drag' ? (
        <AntdUpload.Dragger
          {...uploadProps}
          disabled={
            props.disabled ||
            uploadFile.isLoading ||
            readOnly
          }
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single. Strictly prohibit from
            uploading company data or other band files
          </p>
        </AntdUpload.Dragger>
      ) : (
        <AntdUpload
          {...uploadProps}
          disabled={
            props.disabled ||
            uploadFile.isLoading ||
            readOnly
          }
        >
          <Button icon={<UploadOutlined />}>
            Upload
          </Button>
        </AntdUpload>
      )}
      <DeleteModal
        title={`Delete ${state.currentFile?.name}`}
        open={state.isOpenDeleteModal}
        hasIdentifier={false}
        width={500}
        onCancel={() =>
          setState({
            isOpenDeleteModal: false,
            currentFile: null,
          })
        }
        onDelete={() => {
          if (state.currentFile) {
            deleteFile.submit(
              state.currentFile?.name ?? ''
            );
          }
        }}
        okButtonProps={{
          loading: deleteFile.isLoading,
          danger: true,
        }}
      />
    </>
  );
};
