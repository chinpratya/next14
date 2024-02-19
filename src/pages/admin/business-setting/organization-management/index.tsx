import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  ListOrganizationChart,
  OrganizationManagement,
  useDeleteOrganizationManagement,
} from '@/features/admin';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const OrganizationManagementPage = () => {
  const { showNotification } = useNotifications();
  const toggle = useToggle<OrganizationManagement>();
  const router = useRouter();

  const onEdit = (
    organization: OrganizationManagement
  ) => {
    router.push(
      `${router.asPath}/${organization.departmentId}`
    );
  };

  const onAdd = (
    organization: OrganizationManagement
  ) => {
    router.push(
      `${router.asPath}/new?under=${organization?.departmentId}`
    );
  };

  const deleteOrganizationManagement =
    useDeleteOrganizationManagement({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Organization deleted successfully',
        });
        toggle.remove();
      },
    });

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement" />
        }
      />
      <ListOrganizationChart
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={toggle.remove}
      />
      <DeleteModal
        title="Delete Organization"
        content="Are you sure you want to delete this organization?"
        open={toggle.openRemove}
        identifier={
          toggle?.data?.department_name as string
        }
        onCancel={() => toggle.remove()}
        okButtonProps={{
          loading: deleteOrganizationManagement.isLoading,
        }}
        onDelete={() =>
          deleteOrganizationManagement.submit(
            toggle?.data?.departmentId as string
          )
        }
      />
    </>
  );
};

OrganizationManagementPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default OrganizationManagementPage;
