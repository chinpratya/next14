import {
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Typography,
  Tag,
  Button,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  // useColumnAction,
  useToggle,
  useFilter,
  useRowSelection,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../group/api/list-group';
import { useListTags } from '../../../tags/api/list-tags';
import { useDeleteActivity } from '../../api/delete-activity';
import { useListActivity } from '../../api/list-activity';
import { Activity } from '../../types';

import { useExportActivitiesToPdf } from './hooks/use-export-activities-to-pdf';

export type ActivityListProps = {
  onEdit?: (activity: Activity) => void;
};

export const ActivityList = ({
  onEdit,
}: ActivityListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection();
  const selectedRowKeys: string[] =
    rowSelection.selectedRowKeys ?? [];

  const exportActivitiesToPdf = useExportActivitiesToPdf({
    selectedActivities: selectedRowKeys ?? [],
    onSuccess: () => {
      resetSelectedRowKeys();
    },
  });

  const listTag = useListTags({});

  const { filters, columnFilter, filterDropdown } =
    useFilter<Activity>();

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:read'],
    ],
  });

  const {
    filters: filtersActivityType,
    columnFilter: columnFilterActivityType,
    filterDropdown: filterDropdownActivityType,
  } = useFilter<Activity>();

  const {
    filters: filtersGroup,
    columnFilter: columnFilterGroup,
    filterDropdown: filterDropdownGroup,
  } = useFilter<Activity>();

  const listGroup = useListGroup({
    menuID: 'Activity',
  });
  const deleteActivity = useDeleteActivity({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const { data, isLoading, isError } = useListActivity({
    page,
    pageSize,
    search: debouncedSearch,
    ...filters,
    ...filtersActivityType,
    ...filtersGroup,
  });

  const columns: ColumnsType<Activity> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityId" />
      ),
      dataIndex: 'ObjectUUID',
      key: 'ObjectUUID',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.name" />
      ),
      key: 'name',
      width: 200,
      render: (activity: Activity) => (
        <Typography.Link
          onClick={() => onEdit?.(activity)}
          disabled={!readPermission.isAllow}
        >
          {activity?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityType" />
      ),
      dataIndex: 'activityType',
      key: 'activityType',
      width: 200,
      ...columnFilterActivityType('filter'),
      filters: [
        {
          text: 'ผู้ควบคุมข้อมูลส่วนบุคคล(DC)',
          value: 'data-controller',
        },
        {
          text: 'ผู้ประมวลผลข้อมูล(DP)',
          value: 'data-processor',
        },
      ],
      filterDropdown:
        filterDropdownActivityType('activityType'),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.group" />
      ),
      dataIndex: 'group',
      key: 'group',
      width: 200,
      ...columnFilterGroup('filter'),
      filters: listGroup.data?.data?.map((value) => ({
        text: value.name,
        value: value.name,
      })),
      filterDropdown: filterDropdownGroup('group'),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 100,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },

    {
      title: (
        <IntlMessage id="dataMapping.activity.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      align: 'left',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'createdDate',
      width: 200,
      align: 'left',
      render: (createdDate: string) => (
        <ShowTagDate date={createdDate} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'lastUpdatedDate',
      width: 200,
      align: 'left',
      render: (lastUpdatedDate: string) => (
        <ShowTagDate date={lastUpdatedDate} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
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
      width: 50,
      render: (activity: Activity) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.asset.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(activity),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.asset.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(activity),
            },
          ]}
        />
      ),
    },
    // columnAction,
  ];

  const { filteredColumnsKeys, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="consentManagement.activity.activityList" />
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
            <Button
              icon={<DownloadOutlined />}
              disabled={!selectedRowKeys.length}
              loading={exportActivitiesToPdf.isLoading}
              onClick={exportActivitiesToPdf.onExport}
            >
              <IntlMessage
                id={tokens.common.download}
                className="mr-1"
              />{' '}
              PDF
            </Button>
            <InputSearch
              onSearch={onSearch}
              className="mr-2 ml-2"
              width={200}
              height={40}
            />
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: 1100,
          }}
          dataSource={data?.data}
          columns={filteredColumns}
          pagination={false}
          loading={isLoading}
          rowSelection={rowSelection}
        />
        <Pagination
          total={data?.totalRecord}
          pageSize={pageSize}
          current={page}
          onChange={onPaginationChange}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle?.data?.name}
        onDelete={() =>
          deleteActivity.submit(toggle?.data?.ObjectUUID)
        }
        okButtonProps={{
          loading: deleteActivity.isLoading,
        }}
      />
    </FallbackError>
  );
};
