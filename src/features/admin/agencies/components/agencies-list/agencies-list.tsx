import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Card, Table, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteAgencies } from '../../api/delete-agencies';
import { useListAgencies } from '../../api/list-agencies';
import { Agencies } from '../../types';

export const AgenciesList = () => {
  const { t } = useTranslation();
  const toggle = useToggle<Agencies>();
  const router = useRouter();
  const { showNotification } = useNotifications();

  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } = useListAgencies({
    search: debouncedSearch,
    type_group: 'agencies',
    page_size: pageSize,
    page,
  });

  const deleteAgencies = useDeleteAgencies({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.agencies.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnType<Agencies>[] = [
    {
      title: (
        <IntlMessage id="admin.userManagement.agencies.name" />
      ),
      key: 'name',
      render: (agencies: Agencies) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `${router.asPath}/${agencies.groupId}`
            )
          }
        >
          {agencies.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.agencies.id" />
      ),
      dataIndex: 'agenciesID',
      key: 'agenciesID',
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.agencies.abbreviation" />
      ),
      dataIndex: 'abbreviation_th',
      key: 'abbreviation_th',
    },

    {
      key: 'action',
      title: '',
      align: 'center',
      render: (agencies: Agencies) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="admin.userManagement.agencies.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${router.asPath}/${agencies.groupId}`
                ),
            },
            {
              label: (
                <IntlMessage id="admin.userManagement.agencies.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove?.(agencies),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <Flex>
            <InputSearch onSearch={onSearch} />
          </Flex>
        }
      >
        <Table
          rowKey="groupId"
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>

      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name as string}
        loading={deleteAgencies.isLoading}
        data={toggle.data}
        onCancel={() => toggle.remove()}
        onDelete={(data) =>
          deleteAgencies.submit(data?.groupId as string)
        }
      />
    </FallbackError>
  );
};
