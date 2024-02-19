import { Card, Table } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePagination, useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddDepartmentUser } from '../../api/add-department-user';
import { useListDepartmentUser } from '../../api/list-department';

type ModalAddOrganizationProps = {
  open: boolean;
  onCloseModal: () => void;
  userId: string;
  idOrganization: string[];
};

export const ModalAddOrganization = ({
  open,
  onCloseModal,
  userId,
  idOrganization,
}: ModalAddOrganizationProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const [selectedRowKeys, setSelectedRowKeys] = useState<
    React.Key[]
  >([]);
  const listDepartmentUser = useListDepartmentUser({
    expand: 'expand',
    search: debouncedSearch,
    page,
    pageSize,
    ignore_userId: userId,
  });
  const filteredData = _.filter(
    listDepartmentUser?.data?.data,
    (department) =>
      !_.includes(idOrganization, department.departmentId)
  );

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.organization.add.success'
      ) as string,
    });
    onCloseModal();
    setSelectedRowKeys([]);
  };
  const addDepartmentUser = useAddDepartmentUser({
    onSuccess,
    userId,
  });

  const columns = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.name" />
      ),
      key: 'department_name',
      dataIndex: 'department_name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.table.initials" />
      ),
      key: 'department_abbreviation',
      dataIndex: 'department_abbreviation',
      width: 100,
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
  ];

  const onSelectChange = (
    newSelectedRowKeys: React.Key[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSubmit = () => {
    if (selectedRowKeys.length > 0) {
      addDepartmentUser.submit({
        data: selectedRowKeys as string[],
        userId,
      });
    } else {
      showNotification({
        type: 'error',
        message: t(
          'admin.notification.user.organization.add.error'
        ) as string,
      });
    }
  };

  return (
    <Modal
      open={open}
      title={
        <IntlMessage id="admin.userManagement.user.detail.basicInfo.add" />
      }
      onCancel={() => onCloseModal()}
      onOk={() => onSubmit()}
      okButtonProps={{
        loading: addDepartmentUser.isLoading,
      }}
    >
      <FallbackError isError={listDepartmentUser.isError}>
        <Card
          bordered={false}
          extra={
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
          }
        >
          <Table
            rowKey="departmentId"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredData ?? []}
            tableLayout="fixed"
            scroll={{ x: 450 }}
            loading={listDepartmentUser?.isLoading}
            pagination={false}
          />
          <Pagination
            current={page}
            total={
              listDepartmentUser?.data?.totalRecord ?? 1
            }
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </Card>
      </FallbackError>
    </Modal>
  );
};
