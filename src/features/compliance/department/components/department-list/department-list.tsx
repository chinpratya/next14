import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteBranch } from '../../api/delete-branch';
import { useListBranch } from '../../api/list-branch';
import { Department } from '../../types';

export const DepartmentList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const toggle = useToggle<Department>();
  const { debouncedSearch, onSearch } = useSearch();
  const { showNotification } = useNotifications();
  const { data, isLoading, isError } = useListBranch({
    page,
    page_size: pageSize,
    search: debouncedSearch,
  });

  const editPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:branch:update'],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:branch:delete'],
    ],
  });

  const deleteBranch = useDeleteBranch({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.organization.branch.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<Department> = [
    {
      title: (
        <IntlMessage id="compliance.department.name" />
      ),
      key: 'name',
      ellipsis: true,
      fixed: 'left',
      render: ({
        ObjectUUID,
        name,
        organizationID,
      }: Record<string, unknown>) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `/apps/datafence/compliance/organization/${organizationID}/institute/${ObjectUUID}`
            )
          }
          disabled={!editPermission.isAllow}
        >
          {name as string}
        </Typography.Link>
      ),
      width: 200,
    },
    {
      title: (
        <IntlMessage id="compliance.department.organization" />
      ),
      key: 'organizationName',
      dataIndex: 'organizationName',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.department.province" />
      ),
      key: 'province',
      dataIndex: 'province',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.department.district" />
      ),
      key: 'district',
      dataIndex: 'district',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.department.totalRespondent" />
      ),
      dataIndex: 'totalRespondent',
      key: 'total_respondents',
      width: 100,
      align: 'right',
    },
    {
      title: (
        <IntlMessage id="compliance.department.totalApprover" />
      ),
      dataIndex: 'totalApprover',
      key: 'total_approve',
      width: 150,
      align: 'right',
    },
    {
      title: (
        <IntlMessage id="compliance.department.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      align: 'center',
      width: 150,
      render: (date: string) => (
        <ShowTagDate
          date={date === '0000-00-00' ? null : date}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.department.updatedDt" />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 150,
      align: 'center',
      render: (date: string) => (
        <ShowTagDate
          date={date === '0000-00-00' ? null : date}
        />
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (department: Department) => (
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
                  `/apps/cyberfence/assessment-automation/organization/${department.organizationID}/institute/${department.ObjectUUID}`
                ),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="compliance.organization.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(department),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <Flex justify="end" className="mb-3" gap="sm">
            <InputSearch
              className="mr-1"
              onSearch={onSearch}
            />
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="ObjectUUID"
          columns={filteredColumns}
          scroll={{ x: 1250 }}
          tableLayout="fixed"
          dataSource={data?.data}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.name}
        onDelete={() =>
          deleteBranch.submit({
            instituteId: toggle.data?.ObjectUUID,
            organizationId: toggle.data?.organizationID,
          })
        }
        okButtonProps={{
          loading: deleteBranch.isLoading,
        }}
      />
    </FallbackError>
  );
};
