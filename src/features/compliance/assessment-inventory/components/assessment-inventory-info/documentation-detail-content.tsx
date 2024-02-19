import { Card, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

import { UploadFile } from '@/components/share-components/upload-file';
import { useNotifications } from '@/stores/notifications';

import { useAddFileAssessmentInventoryInfo } from '../../api/add-files-assessment-inventory-info';
import { useDeleteFileAssessmentInventoryInfo } from '../../api/delete-files-assessment-inventory-info';
import {
  AssessmentInventory,
  FileUploadType,
} from '../../types';

type DocumentationContentProps = {
  data: AssessmentInventory | null;
  form: FormInstance;
  assessmentId: string;
  loading: boolean;
};
export const DocumentationDetailContent = ({
  data,
  form,
  assessmentId,
  loading,
}: DocumentationContentProps) => {
  const [fileList, setFileList] = useState<
    FileUploadType[]
  >([]);
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'เพิ่มเอกสารประกอบเรียบร้อย',
    });
  };
  const onSuccessDelete = () => {
    showNotification({
      type: 'success',
      message: 'ลบเอกสารประกอบเรียบร้อย',
    });
  };
  const { submit, isLoading } =
    useAddFileAssessmentInventoryInfo({
      assessmentId,
      onSuccess,
    });
  const {
    submit: submitDelete,
    isLoading: isLoadingDelete,
  } = useDeleteFileAssessmentInventoryInfo({
    assessmentId,
    onSuccess: onSuccessDelete,
  });
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
  const onSetFileList = (filelist: FileUploadType[]) =>
    setFileList(filelist);
  const onAddFile = (fileID: string, fileName: string) =>
    submit({
      fileID,
      fileName,
    });

  return (
    <Card title="เอกสารประกอบ" loading={loading}>
      <Form form={form} layout="vertical">
        <Form.Item name="files">
          <UploadFile
            isLoading={isLoading}
            isLoadingDelete={isLoadingDelete}
            fileList={fileList}
            setFileList={onSetFileList}
            onAddFile={onAddFile}
            onDelete={submitDelete}
            expriesIn={3600}
            type="private"
            group={assessmentId}
            moduleName="assessment"
          />
        </Form.Item>
      </Form>
    </Card>
  );
};
