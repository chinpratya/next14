import {
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteDepartmentUser } from '../../api/delete-department-of-user';
import { useListDepartmentOfUser } from '../../api/list-department-of-user';
import { UserDepartment } from '../../types';

import { ModalAddOrganization } from './modal-add-organization';

type UserDetailListOrgProps = {
  userId: string;
};
export const UserDetailListOrg = ({
  userId,
}: UserDetailListOrgProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.organization.delete'
      ) as string,
    });
    toggle.remove();
  };

  const deleteDepartment = useDeleteDepartmentUser({
    onSuccess,
    userId,
  });

  const { data, isLoading } = useListDepartmentOfUser({
    userId,
    search: debouncedSearch,
    page,
    pageSize,
  });
  const idOrganizationOfUser = _.map(
    data?.data,
    (department) => department.departmentId
  );

  const columns: ColumnsType<UserDepartment> = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.name" />
      ),
      key: 'department_name',
      dataIndex: 'department_name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.initials" />
      ),
      key: 'department_abbreviation',
      dataIndex: 'department_abbreviation',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.lvOrganization" />
      ),
      key: 'level',
      dataIndex: 'level',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.label" />
      ),
      dataIndex: 'level_label',
      key: 'level_label',
      width: 100,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (user: UserDepartment) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="admin.userManagement.user.detail.basicInfo.delete" />
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

  const onDeleteDepartments = (departmentId: string) => {
    deleteDepartment.submit({
      userId,
      departmentId: departmentId,
    });
  };

  return (
    <>
      <Card
        extra={
          <>
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
            <Button
              type="primary"
              onClick={() => toggle.create()}
            >
              <PlusCircleOutlined className="mr-1" />
              <IntlMessage id="admin.userManagement.user.detail.basicInfo.add" />
            </Button>
          </>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data ?? []}
          tableLayout={'fixed'}
          scroll={{ x: 650 }}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <ModalAddOrganization
        open={toggle.openCreate}
        onCloseModal={() => toggle.create()}
        userId={userId}
        idOrganization={idOrganizationOfUser}
      />
      <DeleteModal
        open={toggle.openRemove}
        identifier={
          toggle.data?.department_name as string
        }
        // loading={deleteDepartment.isLoading}
        okButtonProps={{
          loading: deleteDepartment.isLoading,
        }}
        data={toggle.data}
        onCancel={() => toggle.remove()}
        onDelete={(data) =>
          onDeleteDepartments(
            data?.departmentId as string
          )
        }
      />
    </>
  );
};
