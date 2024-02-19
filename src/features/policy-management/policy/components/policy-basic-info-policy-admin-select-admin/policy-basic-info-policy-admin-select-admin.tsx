import { SearchOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/share-components/flex';
import { InputSearch } from '@/components/share-components/input-search';
import { useListUser, User } from '@/features/admin';
import {
  usePagination,
  useSearch,
  useRowSelection,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddPolicyUser } from '../../api/add-polic-user';

type PolicyBasicInfoPolicyAdminSelectAdminProps = {
  open: boolean;
  onCancel: () => void;
  policyId: string;
  keyDisabled: string[];
};

export const PolicyBasicInfoPolicyAdminSelectAdmin = ({
  open,
  onCancel,
  policyId,
  keyDisabled,
}: PolicyBasicInfoPolicyAdminSelectAdminProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      disabledRowKeys: keyDisabled,
      disabledKey: 'userId',
    });

  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } = useListUser({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const addUser = useAddPolicyUser({
    policyId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.policyAdmin.add'
        ) as string,
      });
      onCancel();
    },
  });

  const columns: ColumnsType<User> = [
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.name" />
      ),
      key: 'name',
      width: 150,
      render: (user: User) =>
        `${user.first_name} ${user.last_name}`,
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.organization" />
      ),
      dataIndex: 'organization_labels',
      key: 'organization_labels',
      ellipsis: true,
      width: 150,
      render: (Organization: string[]) => (
        <TagTooltipListChild list={Organization ?? []} />
      ),
    },
  ];

  const onSubmit = () => {
    console.log(
      'onSubmit',
      rowSelection?.selectedRowKeys
    );
    const payload = {
      userId: rowSelection?.selectedRowKeys,
    };
    addUser.submit(payload);
  };

  return (
    <Modal
      title={
        <IntlMessage id="policyManagement.policy.detail.policyAdmin.select" />
      }
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      okButtonProps={{ loading: addUser.isLoading }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError isError={isError}>
        <Flex
          justifyContent="end"
          alignItems="center"
          className="mb-4"
        >
          <InputSearch
            placeholder={
              t(
                'policyManagement.policy.detail.policyAdmin.search'
              ) as string
            }
            prefix={<SearchOutlined />}
            onSearch={(e) => {
              onSearch(e);
              onPaginationChange(1, pageSize);
            }}
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 450 }}
          rowSelection={rowSelection}
          rowKey="userId"
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
