import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
  useFilter,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { removeQuery } from '@/utils';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../group/api/list-group';
import { useListTags } from '../../../tags/api/list-tags';
import { useDeletePurpose } from '../../api/delete-purpose';
import { useListPurpose } from '../../api/list-purpose';
import { Purpose } from '../../types';

export const PurposeList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { showNotification } = useNotifications();
  const listTag = useListTags({});

  const { filters, columnFilter, filterDropdown } =
    useFilter<Purpose>();

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:purpose:delete'],
    ],
  });
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:purpose:update'],
    ],
  });
  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:purpose:read'],
    ],
  });
  const {
    filters: filtersGroup,
    columnFilter: columnFilterGroup,
    filterDropdown: filterDropdownGroup,
  } = useFilter<Purpose>();

  const listGroup = useListGroup({
    menuID: 'Purpose',
  });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'dataMapping.notification.purpose.delete'
      ) as string,
    });
    toggle.remove();
  };

  const { data, isLoading, isError } = useListPurpose({
    search: debouncedSearch,
    page,
    pageSize,
    ...filters,
    ...filtersGroup,
  });

  const deletePurpose = useDeletePurpose({ onSuccess });

  const statusItems = [
    {
      label: tokens.common.status.active,
      key: 'active',
      color: '#04D182',
    },
    {
      label: tokens.common.status.inactive,
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];

  const columns: ColumnsType<Purpose> = [
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.Id" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      align: 'left',
      width: 150,
      ellipsis: true,
    },

    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.name" />
      ),
      key: 'purposeName',
      width: 200,
      render: (purpose: Purpose) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `${removeQuery(router.asPath)}/${
                purpose.purposeID
              }`
            )
          }
          disabled={!readPermission.isAllow}
        >
          {purpose.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 100,
      ...columnFilterGroup('filter'),
      filters: listGroup.data?.data?.map((value) => ({
        text: value.name,
        value: value.name,
      })),
      filterDropdown: filterDropdownGroup('group'),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={statusItems}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.version" />
      ),
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.createdDt" />
      ),
      key: 'created_dt',
      dataIndex: 'created_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.updatedDt" />
      ),
      key: 'updated_dt',
      dataIndex: 'updated_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purpose.table.tags" />
      ),
      key: 'tagName',
      dataIndex: 'tagName',
      width: 200,
      ...columnFilter('filter'),
      filters: listTag.data?.data?.map((value) => ({
        text: value.name,
        value: value.tagID,
      })),
      filterDropdown: filterDropdown('tagID'),
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (purpose: Purpose) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.purpose.table.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              disabled: !editPermission.isAllow,
              onClick: () => {
                router
                  .push(
                    `${removeQuery(router.asPath)}/${
                      purpose.purposeID
                    }`
                  )
                  .then();
              },
            },
            {
              label: (
                <IntlMessage id="dataMapping.purpose.table.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(purpose),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer } =
    useColumnFiltered({
      columns,
      loading: listGroup.isLoading,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );
  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="dataMapping.purpose.table.title" />
            <Typography.Text
              className="ml-2"
              style={{
                fontSize: 14,
                fontWeight: 'normal',
              }}
            >
              {data?.totalRecord ?? 0}{' '}
              <IntlMessage id={tokens.common.items} />
            </Typography.Text>
          </>
        }
        extra={
          <Flex justifyContent="end">
            <InputSearch
              className="mr-2"
              onSearch={onSearch}
            />
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="purposeID"
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          tableLayout="fixed"
          scroll={{ x: 1600 }}
          pagination={false}
          loading={isLoading || listGroup.isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name}
          okButtonProps={{
            loading: deletePurpose.isLoading,
          }}
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deletePurpose.submit(toggle.data.purposeID)
          }
        />
      </Card>
    </FallbackError>
  );
};
