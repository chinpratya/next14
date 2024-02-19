import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteOrganizationBranchContact } from '../../api/delete-organization-branch-contact';
import { useListOrganizationBranchContact } from '../../api/list-organization-branch-contact';
import { OrganizationContact } from '../../types';
import { OrganizationBasicInfoBranchContactUpdateModal } from '../organization-basic-info-branch-contact-update-modal';
import { OrganizationBasicInfoContactCreateModal } from '../organization-basic-info-contact-create-modal';

import { OrganizationBasicInfoUnitGeneralDataContactListTable } from './organization-basic-info-unit-general-data-contact-list-table';

export type OrganizationBasicInfoUnitGeneralDataContactListProps =
  {
    orgName: string;
    branchId: string;
  };

export const OrganizationBasicInfoUnitGeneralDataContactList =
  ({
    orgName,
    branchId,
  }: OrganizationBasicInfoUnitGeneralDataContactListProps) => {
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
    } = usePagination();

    const { isLoading, isError, data } =
      useListOrganizationBranchContact({
        organizationId,
        branchId,
        page,
        pageSize,
      });

    const deleteContact =
      useDeleteOrganizationBranchContact({
        organizationId,
        branchId,
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
        <Card
          title={
            <IntlMessage id="compliance.organization.detail.contact.title" />
          }
          extra={
            <Button
              ghost
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => toggle.create()}
            >
              <IntlMessage id="compliance.organization.detail.contact.add" />
            </Button>
          }
        >
          <OrganizationBasicInfoUnitGeneralDataContactListTable
            dataSource={data?.data ?? []}
            loading={isLoading}
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
        </Card>
        <OrganizationBasicInfoContactCreateModal
          organizationId={organizationId}
          branchId={branchId}
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          orgName={orgName}
        />
        <OrganizationBasicInfoBranchContactUpdateModal
          organizationId={organizationId}
          contactId={
            (toggle.data?.ObjectUUID as string) ?? ''
          }
          branchId={branchId}
          open={toggle.openEdit}
          onCancel={() => toggle.edit()}
          pageSize={pageSize}
          page={page}
          data={toggle.data}
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
