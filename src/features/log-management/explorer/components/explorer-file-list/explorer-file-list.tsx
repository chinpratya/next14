import { Card, Form } from 'antd';
import { t } from 'i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { ArchiveDetail } from '../../../archive/components/archive-detail';
import { useCreateArchive } from '../../api/create-archive';
import { useListDirectory } from '../../api/list-directory';
import { Directory } from '../../types';
import { ExplorerArchiveModal } from '../explorer-archive-modal';
import { ExplorerFileDetailModal } from '../explorer-file-detail-modal';

import { ExplorerFileTable } from './explorer-file-table';

type Breadcrumb = {
  title: string;
  path: string;
};

type ExplorerFileListProps = {
  path: string;
  onSetBreadcrumb: (value: Breadcrumb[]) => void;
};

export const ExplorerFileList = ({
  path,
}: ExplorerFileListProps) => {
  const [form] = Form.useForm();
  const toggle = useToggle<Directory>();
  const { showNotification } = useNotifications();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListDirectory({
    params: {
      path: path,
      level: 'file',
      page,
      page_size: pageSize,
    },
  });

  const createArchive = useCreateArchive({
    path,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      toggle.choose();
    },
  });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const onChangeArchive = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      id: toggle.data.id,
      indices: toggle.data.path.split('/')[1],
      path: `${toggle.data.path}/${toggle.data.name}`,
      type: 'File',
      ...values,
    };
    createArchive.submit(payload);
  };

  return (
    <FallbackError isError={isError}>
      <Card>
        <ExplorerFileTable
          dataSource={data?.data ?? []}
          loading={isLoading}
          onChoose={toggle.choose}
          onEdit={toggle.edit}
          onPreview={toggle.preview}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>

      <ExplorerArchiveModal
        form={form}
        data={toggle.data}
        open={toggle.openChoose}
        loading={createArchive.isLoading}
        onCancel={toggle.choose}
        onSubmit={onChangeArchive}
      />
      <ExplorerFileDetailModal
        directory={toggle.data}
        open={toggle.openEdit}
        onCancel={toggle.edit}
      />

      <ArchiveDetail
        open={toggle.openPreview}
        onClose={toggle.preview}
        data={toggle?.data}
      />
    </FallbackError>
  );
};
