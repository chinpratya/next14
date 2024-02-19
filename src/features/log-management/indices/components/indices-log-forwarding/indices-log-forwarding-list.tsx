import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { useNotifications } from '@/stores/notifications';

import { useDeleteLogForwarding } from '../../api/delete-log-forwarding';
import { useListLogForwarding } from '../../api/list-log-forwarding';
import { Forwarding } from '../../types';

const { lm } = logManagementModules;

type IndicesLogForwardingListProps = {
  indiceId: string;
  organization: string;
};

export const IndicesLogForwardingList = ({
  indiceId,
  organization,
}: IndicesLogForwardingListProps) => {
  const router = useRouter();
  const toggle = useToggle<Forwarding>();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useListLogForwarding({
      indices: indiceId,
      organization,
    });

  const deleteForwarding = useDeleteLogForwarding({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.deleted'
        ) as string,
      });
      toggle.remove();
    },
  });

  const editPermission = usePermission({
    moduleName: lm,
    policies: [permissions['cyber:lm:indices:update']],
  });

  const deletePermission = usePermission({
    moduleName: lm,
    policies: [permissions['cyber:lm:indices:delete']],
  });

  const forwardingInfoUrl = `/apps/cyberfence/log-management/indices/${indiceId}/log-forwarding`;

  const columns: ColumnsType<Forwarding> = [
    {
      title: <IntlMessage id="logManagement.name" />,
      key: 'name',
      fixed: 'left',
      render: (forwarding: Forwarding) => (
        <Link
          href={`${forwardingInfoUrl}/${forwarding.id}`}
        >
          {forwarding.name}
        </Link>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.host" />
      ),
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.port" />
      ),
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.protocol" />
      ),
      dataIndex: 'protocol',
      key: 'protocol',
      align: 'center',
      render: (protocol: string) =>
        protocol.toUpperCase(),
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.tls" />
      ),
      dataIndex: 'ssl_verify',
      key: 'ssl_verify',
      align: 'center',
      width: 150,
      render: (value: boolean) => (
        <ShowTagStatus
          items={[
            {
              label: 'Enable',
              key: 'Enable',
              color: '#04D182',
            },
            {
              label: 'Disable',
              key: 'Disable',
              color: '#FF6B72',
            },
          ]}
          status={value ? 'Enable' : 'Disable'}
        />
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (forwarding: Forwarding) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              disabled: !editPermission.isAllow,
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${forwardingInfoUrl}/${forwarding.id}?edit=true`
                ),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => {
                toggle.remove(forwarding);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          rowKey="id"
          dataSource={data?.data}
          loading={isLoading}
          columns={columns}
          pagination={false}
        />
      </Card>

      <DeleteModal
        open={toggle.openRemove}
        loading={deleteForwarding.isLoading}
        identifier={toggle.data?.name as string}
        data={toggle.data}
        onDelete={(forwading) =>
          deleteForwarding.submit(forwading?.id as string)
        }
        onCancel={() => toggle.remove()}
      />
    </FallbackError>
  );
};
