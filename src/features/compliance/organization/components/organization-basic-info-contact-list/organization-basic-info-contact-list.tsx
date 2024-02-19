import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteOrganizationContact } from '../../api/delete-organization-contact';
import { useListOrganizationContact } from '../../api/list-organization-contact';
import { OrganizationContact } from '../../types';
import { OrganizationBasicInfoContactCreateModal } from '../organization-basic-info-contact-create-modal';
import { OrganizationBasicInfoContactUpdateModal } from '../organization-basic-info-contact-update-modal';

import { OrganizationBasicInfoContactListTable } from './organization-basic-info-contact-list-table';

type OrganizationBasicInfoContactListProps = {
  orgName: string;
};
export const OrganizationBasicInfoContactList = ({
  orgName,
}: OrganizationBasicInfoContactListProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const organizationId = router.query
    .organizationId as string;

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({ pageSize: 3 });

  const { isLoading, isError, data } =
    useListOrganizationContact({
      organizationId,
      page,
      pageSize,
    });

  const deleteContact = useDeleteOrganizationContact({
    organizationId,
    page,
    pageSize,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.organization.contact.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  return (
    <FallbackError isError={isError}>
      <Card>
        <div
          style={{
            height: 307,
          }}
        >
          <OrganizationBasicInfoContactListTable
            dataSource={data?.data ?? []}
            loading={isLoading}
            onCreate={toggle.create}
            onEdit={toggle.edit}
            onDelete={(contact: OrganizationContact) =>
              toggle.remove(contact)
            }
          />
          <Pagination
            current={page}
            total={data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </div>
      </Card>
      <OrganizationBasicInfoContactCreateModal
        organizationId={organizationId}
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
        orgName={orgName}
      />
      <OrganizationBasicInfoContactUpdateModal
        organizationId={organizationId}
        contactId={
          (toggle.data?.ObjectUUID as string) ?? ''
        }
        data={toggle.data}
        page={page}
        pageSize={pageSize}
        open={toggle.openEdit}
        onCancel={() => toggle.edit()}
        orgName={orgName}
      />
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name}
        onCancel={() => toggle.remove()}
        loading={deleteContact.isLoading}
        onDelete={() =>
          deleteContact.submit(toggle.data?.ObjectUUID)
        }
      />
    </FallbackError>
  );
};
