import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useSetState, useToggle } from '@mantine/hooks';
import {
  Table,
  Typography,
  MenuProps,
  Dropdown,
  Button,
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  useCsv,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FileManageOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteOrganization } from '../../api/delete-organization';
import { Organization } from '../../types';
import { ModalManageData } from '../organization-modal-manage-data';

export type OrganizationListTableProps = {
  data: Organization[];
  loading: boolean;
};

export type State = {
  open: boolean;
  data: Organization | null;
};

export const OrganizationListTable = ({
  data,
  loading,
}: OrganizationListTableProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const [state, setState] = useSetState<State>({
    open: false,
    data: null,
  });
  const [openModalManage, toggleModalManage] =
    useToggle();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'compliance.notification.organization.delete'
      ) as string,
    });
    setState({ open: false, data: null });
  };

  const { submit, isLoading } = useDeleteOrganization({
    onSuccess,
  });

  const readPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:organization:read'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions[
        'pdpakit:compliance:organization:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions[
        'pdpakit:compliance:organization:delete'
      ],
    ],
  });

  const columns = [
    {
      title: (
        <IntlMessage id="compliance.organization.name" />
      ),
      key: 'name',
      ellipsis: true,
      render: ({ ObjectUUID, name }: Organization) => (
        <Typography.Link
          href={`${router.pathname}/${ObjectUUID}`}
          disabled={!readPermission.isAllow}
        >
          {name}
        </Typography.Link>
      ),
      width: 200,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.orgGroup" />
      ),
      key: 'orgGroup',
      dataIndex: 'orgGroup',
      width: 170,
      ellipsis: true,
      render: (orgGroup: string[]) => (
        <Typography.Text>
          {orgGroup?.join(' / ') ?? '-'}
        </Typography.Text>
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.organization.industryGroup" />
      ),
      key: 'industryGroup',
      dataIndex: 'industryGroup',
      width: 130,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.businessCategory" />
      ),
      key: 'businessCategory',
      dataIndex: 'businessCategory',
      width: 130,
    },
    {
      key: 'action',
      width: 50,
      render: (inventory: Organization) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="compliance.organization.edit" />
              ),
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${router.pathname}/${inventory.ObjectUUID}`
                ),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="compliance.organization.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () =>
                setState({ open: true, data: inventory }),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { ExportCsv } = useCsv({
    data,
    columns,
    fileName: 'organization.csv',
    renderType: 'link',
  });

  const items: MenuProps['items'] = [
    {
      label: (
        <IntlMessage id="compliance.organization.import" />
      ),
      key: '1',
      icon: <DownloadOutlined />,
      onClick: () => toggleModalManage(),
    },
    {
      label: ExportCsv,
      key: '2',
      icon: <UploadOutlined />,
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <>
      <Flex justify="end" className="mb-4" gap="sm">
        <Dropdown menu={{ items }}>
          <Button
            className="mr-2"
            icon={<FileManageOutlined />}
          >
            <IntlMessage id="compliance.organization.manage" />
          </Button>
        </Dropdown>
        {ColumnTransfer}
      </Flex>
      <Table
        rowKey="ObjectUUID"
        dataSource={data}
        columns={filteredColumns}
        pagination={false}
        loading={loading}
      />
      <DeleteModal
        loading={isLoading}
        open={state.open}
        identifier={state.data?.name}
        onDelete={() =>
          submit(_.get(state, 'data.ObjectUUID') ?? null)
        }
        onCancel={() =>
          setState({ open: false, data: null })
        }
      />
      <ModalManageData
        open={openModalManage}
        onToggle={() => toggleModalManage()}
      />
    </>
  );
};
