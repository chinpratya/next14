import {
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DropdownTable } from '@components/dropdown-table';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeletePolicyUser } from '../../api/delete-policy-user';
import { useListPolicyUsers } from '../../api/list-policy-user';
import { PolicyUser } from '../../types';
import { PolicyBasicInfoPolicyAdminSelectAdmin } from '../policy-basic-info-policy-admin-select-admin';

type PolicyBasicInfoPolicyAdminProps = {
  policyId: string;
};
export const PolicyBasicInfoPolicyAdmin = ({
  policyId,
}: PolicyBasicInfoPolicyAdminProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListPolicyUsers(policyId);

  const deleteUser = useDeletePolicyUser({
    policyId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.policyAdmin.delete'
        ) as string,
      });
      toggle.remove();
    },
  });
  const keyDisabled = data?.data.map((v) => v.ObjectUUID);

  const editPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:update'],
    ],
  });

  const columns: ColumnsType<PolicyUser> = [
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.position" />
      ),
      key: 'position',
      dataIndex: 'position',
      render: (position: string[]) => (
        <TagTooltipListChild list={position} />
      ),
      width: 150,
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      render: (organization: string[]) => (
        <TagTooltipListChild list={organization} />
      ),
      width: 150,
    },
    {
      key: 'action',
      width: 50,
      render: (version: PolicyUser) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="policyManagement.policy.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(version),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="policyManagement.policy.detail.policyAdmin.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => toggle.create()}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id="policyManagement.policy.detail.policyAdmin.select" />
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <PolicyBasicInfoPolicyAdminSelectAdmin
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          policyId={policyId}
          keyDisabled={keyDisabled as string[]}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name}
        okButtonProps={{
          loading: deleteUser.isLoading,
        }}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteUser.submit(toggle.data.ObjectUUID)
        }
      />
    </FallbackError>
  );
};
