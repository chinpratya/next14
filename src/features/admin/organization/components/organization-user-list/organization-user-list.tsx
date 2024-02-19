import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePagination,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteOrganizationUser } from '../../api/delete-organization-user';
import { useListOrganizationUser } from '../../api/list-organization-user';
import { OrganizationUser } from '../../types';

import { SelectOrganizationUserModal } from './select-organization-user-modal';

export type OrganizationUserListProps = {
  organizationId: string;
  onEdit?: (user: OrganizationUser) => void;
};

export const OrganizationUserList = ({
  organizationId,
  onEdit,
}: OrganizationUserListProps) => {
  const toggle = useToggle<OrganizationUser>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListOrganizationUser({
      departmentId: organizationId,
      page,
      pageSize,
    });

  const deleteOrganizationUser =
    useDeleteOrganizationUser({
      departmentId: organizationId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'User deleted successfully',
        });
        toggle.remove();
      },
    });

  const statusItems = [
    {
      label: 'Active',
      key: 'active',
      color: '#04D182',
    },
    {
      label: 'Inactive',
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];

  const columns: ColumnsType<OrganizationUser> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.userId" />
      ),
      key: 'id',
      dataIndex: 'userId',
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.name" />
      ),
      key: 'name',
      width: 200,
      render: (user: OrganizationUser) => (
        <Button
          type="link"
          className="p-0"
          onClick={() => onEdit?.(user)}
        >
          {`${user.first_name} ${user.last_name}`}
        </Button>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.email" />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.tel" />
      ),
      key: 'tel',
      dataIndex: 'phone_number',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.employeeClassification" />
      ),
      key: 'employeeClassification',
      dataIndex: 'employee_classification',
      width: 200,
      render: (employeeClassification: string) => (
        <Typography.Text className="text-capitalize">
          {employeeClassification}
        </Typography.Text>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      align: 'left',
      width: 100,
      render: (status: boolean) => (
        <ShowTagStatus
          status={`${status}`}
          items={statusItems}
        />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (user: OrganizationUser) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="admin.businessSetting.organizationManagement.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(user),
            },
            {
              label: (
                <IntlMessage id="admin.businessSetting.organizationManagement.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(user),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: ['id', 'name'],
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement.user.title" />
        }
        extra={
          <>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => toggle.create()}
            >
              <IntlMessage id="admin.businessSetting.organizationManagement.add" />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          loading={isLoading}
          tableLayout="fixed"
          scroll={{
            x: 1200,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </Card>
      <SelectOrganizationUserModal
        organizationId={organizationId}
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
      <DeleteModal
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement.delete.title" />
        }
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle?.data?.first_name}
        content={
          <IntlMessage id="admin.businessSetting.organizationManagement.delete.content" />
        }
        onDelete={() =>
          deleteOrganizationUser.submit(
            toggle.data.userId as string
          )
        }
        okButtonProps={{
          loading: deleteOrganizationUser.isLoading,
        }}
      />
    </FallbackError>
  );
};
