import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DataControllerList,
  DataControllers,
  useDeleteDataController,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const DataControllerPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle<DataControllers>();

  const { showNotification } = useNotifications();

  const deleteDataController = useDeleteDataController({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataController.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onCreateDataController = () =>
    router.push(`${router.asPath}/create`);

  const onEditDataController = (
    dataController: DataControllers
  ) =>
    router.push(
      `${router.asPath}/${dataController.dataProcessorID}`
    );

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataController.titleList" />
        }
        extra={
          <>
            <PermissionWrapper
              moduleName={'datamap'}
              policies={[
                permissions[
                  'pdpakit:datamap:dataprocessor:create'
                ],
              ]}
            >
              <Button
                type="primary"
                icon={
                  <PlusCircleOutlined className="mr-1" />
                }
                onClick={onCreateDataController}
              >
                {
                  <IntlMessage id="dataMapping.dataController.create" />
                }
              </Button>
            </PermissionWrapper>
          </>
        }
      />
      <DataControllerList
        onEdit={onEditDataController}
        onDelete={toggle.remove}
      />
      <DeleteModal
        title="Delete Data Controller"
        content="Are you sure you want to delete this data controller?"
        identifier={toggle.data?.name}
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteDataController.submit(
            toggle?.data?.dataProcessorID
          )
        }
        okButtonProps={{
          loading: deleteDataController.isLoading,
        }}
      />
    </>
  );
};

DataControllerPage.getLayout = (
  page: React.ReactNode
) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:dataprocessor:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DataControllerPage;
