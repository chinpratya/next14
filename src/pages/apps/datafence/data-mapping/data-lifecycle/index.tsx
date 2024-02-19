import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DataLifecycle,
  DataLifecycleList,
  useDeleteDataLifecycle,
  DataLifecycleCreateModal,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const DataLifecyclePage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const router = useRouter();
  const toggle = useToggle<DataLifecycle>();

  const deleteDataLifecycle = useDeleteDataLifecycle({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataLifecycle.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onEdit = (dataLifecycle: DataLifecycle) =>
    router.push({
      pathname: `${router.asPath}/${dataLifecycle.dataLifeCycleID}`,
    });

  const onDelete = (dataLifecycle: DataLifecycle) =>
    toggle.remove(dataLifecycle);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataLifecycle.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:lifecycle:create'
              ],
            ]}
          >
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={() => toggle.create()}
            >
              {' '}
              <IntlMessage id="dataMapping.dataLifecycle.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <DataLifecycleList
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <DeleteModal
        title={
          <IntlMessage id="dataMapping.dataLifecycle.delete.title" />
        }
        content={
          <IntlMessage id="dataMapping.dataLifecycle.delete.content" />
        }
        open={toggle.openRemove}
        identifier={toggle.data?.name as string}
        onDelete={() =>
          deleteDataLifecycle.submit(
            toggle.data.dataLifeCycleID as string
          )
        }
        onCancel={() => toggle.remove()}
        okButtonProps={{
          loading: deleteDataLifecycle.isLoading,
        }}
      />
      <DataLifecycleCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

DataLifecyclePage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:lifecycle:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DataLifecyclePage;
