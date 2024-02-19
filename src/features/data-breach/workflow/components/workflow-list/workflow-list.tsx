import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
  useFilter,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteWorkflow } from '../../api/delete-workflow';
import { useListWorkflow } from '../../api/list-workflow';
import { Workflow } from '../../types';
import { permissions } from '@/permissions';

export const WorkFlowList = () => {
  const { t } = useTranslation();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { filters, columnFilter, filterDropdown } =
    useFilter<Workflow>();

  const { search, debouncedSearch, onSearch } =
    useSearch();

  const toggle = useToggle();
  const router = useRouter();

  const { showNotification } = useNotifications();

  const { data, isError, isLoading } = useListWorkflow({
    page,
    pageSize,
    search: debouncedSearch,
    filters,
  });

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:responseplan:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:responseplan:delete'
      ],
    ],
  });
  const deleteWorkflow = useDeleteWorkflow({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .delete
        ) as string,
      });
      toggle.remove();
    },
  });

  const onEdit = (workflow: Workflow) => {
    router.push(
      `${router.asPath}/${workflow.workflowID}`
    );
  };

  const columns: ColumnsType<Workflow> = [
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.responsePlan
              .responsePlanName
          }
        />
      ),
      key: 'name',
      width: 250,
      ellipsis: true,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('name', 'search'),
      render: (workflow) => {
        return (
          <Typography.Link
            onClick={() => onEdit(workflow)}
          >
            {workflow.name}
          </Typography.Link>
        );
      },
    },
    {
      title: (
        <IntlMessage id={tokens.common.status.title} />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <ShowTagStatus status={status} />
      ),
    },
    // {
    //   title: (
    //     <IntlMessage
    //       id={tokens.dataBreach.responsePlan.version}
    //     />
    //   ),
    //   dataIndex: 'version',
    //   key: 'version',
    //   width: 120,
    //   render: (version) =>
    //     version && version !== 0 ? (
    //       <ShowTagStatus
    //         item={{
    //           key: 'success',
    //           label: `V.${version}`,
    //           color: '#52c41a',
    //         }}
    //       />
    //     ) : (
    //       '-'
    //     ),
    // },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.createdDt}
        />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 200,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.updatedDt}
        />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 200,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.tags}
        />
      ),
      dataIndex: 'tagName',
      key: 'tags',
      width: 150,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('tags', 'search'),
      render: (tags) =>
        tags?.map((tag: string) => (
          <Tag key={tag} className="mx-1 my-1">
            {tag}
          </Tag>
        )) ?? '-',
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (Workflow: Workflow) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id={tokens.common.edit} />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit(Workflow),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(Workflow),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer, xScroll } =
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
          <IntlMessage
            id={tokens.dataBreach.responsePlan.list}
          />
        }
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="workflowID"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            deleteWorkflow.submit(toggle.data?.workflowID)
          }
          okButtonProps={{
            loading: deleteWorkflow.isLoading,
          }}
        />
      </Card>
    </FallbackError>
  );
};
