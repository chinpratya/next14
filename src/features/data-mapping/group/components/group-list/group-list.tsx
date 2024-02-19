import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { InputSearch } from '@/components/share-components/input-search';
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
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteGroup } from '../../api/delete-group';
import { useListGroup } from '../../api/list-group';
import { Group } from '../../types';

export const GroupList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle<Group>();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:group:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:group:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [permissions['pdpakit:datamap:group:read']],
  });
  const { data, isLoading, isError } = useListGroup({
    page,
    pageSize,
    search: debouncedSearch,
  });

  const deleteGroup = useDeleteGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.group.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<Group> = [
    {
      title: (
        <IntlMessage id="dataMapping.group.groupId" />
      ),
      dataIndex: 'groupID',
      key: 'groupID',
      width: 100,
      ellipsis: true,
    },
    {
      title: <IntlMessage id="dataMapping.group.name" />,
      key: 'name',
      width: 200,
      render: (group: Group) => (
        <Typography.Link
          href={`${router.pathname}/${group.groupID}`}
          disabled={!readPermission.isAllow}
        >
          {group?.name}
        </Typography.Link>
      ),
    },
    {
      title: <IntlMessage id="dataMapping.group.menu" />,
      dataIndex: 'menuName',
      key: 'menuName',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.group.organization" />
      ),
      dataIndex: 'organizationName',
      key: 'organizationName',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.group.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      align: 'left',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.group.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      align: 'left',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (group: Group) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.group.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${router.pathname}/${group.groupID}`
                ),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.group.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(group),
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
          <>
            <InputSearch
              className="mr-2"
              onSearch={onSearch}
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: 1010,
          }}
          rowKey="groupID"
          dataSource={data?.data}
          columns={filteredColumns}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteGroup.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteGroup.submit(data?.groupID as string)
          }
        />
      </Card>
    </FallbackError>
  );
};
