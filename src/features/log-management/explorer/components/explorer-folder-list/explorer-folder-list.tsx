import { encode } from 'punycode';

import { Card, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useCreateArchive } from '../../api/create-archive';
import {
  Directory,
  DirectoryLevel,
  DirectoryResponse,
} from '../../types';
import { ExplorerArchiveModal } from '../explorer-archive-modal';

import { ExplorerFolderTable } from './explorer-folder-table';

type ExplorerFolderListProps = {
  path: string;
  level: string;
  nextLevel: string;
  data?: DirectoryResponse;
  loading?: boolean;
  indexLabel?: string;
};

export const ExplorerFolderList = ({
  level,
  nextLevel,
  data,
  indexLabel,
  loading,
  path,
}: ExplorerFolderListProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const toggle = useToggle<Directory>();
  const { showNotification } = useNotifications();

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

  const onOpen = (path: string, indexName?: string) => {
    let currentPath = `${path}&${nextLevel}&${indexLabel}`;

    if (level === 'index') {
      currentPath = `${path}&${nextLevel}&${indexName}`;
    }

    const pathEncode = encode(currentPath);

    router.push(
      `/apps/cyberfence/log-management/explorer/${window.btoa(
        pathEncode
      )}`
    );
  };

  const onChangeArchive = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      id: '',
      indices: toggle.data.path.split('/')[1],
      path: toggle.data.path,
      type: 'Folder',
      ...values,
    };
    createArchive.submit(payload);
  };

  return (
    <>
      <Card>
        <ExplorerFolderTable
          dataSource={data?.data ?? []}
          loading={loading}
          level={level as DirectoryLevel}
          onOpen={onOpen}
          onChoose={toggle.choose}
        />
      </Card>

      <ExplorerArchiveModal
        form={form}
        data={toggle.data}
        open={toggle.openChoose}
        loading={createArchive.isLoading}
        onSubmit={onChangeArchive}
        onCancel={toggle.choose}
      />
    </>
  );
};
