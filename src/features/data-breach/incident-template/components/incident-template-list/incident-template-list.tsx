import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { renderDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteIncidentTemplate } from '../../api/delete-incident-template';
import { useDuplicateIncidentTemplate } from '../../api/duplicate-incident-template';
import { useListIncidentTemplate } from '../../api/list-incident-template';
import { IncidentTemplateType } from '../../types';
import { permissions } from '@/permissions';

export type IncidentTemplateListProps = {
  onEdit?: (
    incidentTemplate: IncidentTemplateType
  ) => void;
};

export const IncidentTemplateList = ({
  onEdit,
}: IncidentTemplateListProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const toggle = useToggle<IncidentTemplateType>();

  const { search, onSearch, debouncedSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListIncidentTemplate({
      search: debouncedSearch,
      page,
      pageSize,
    });

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:delete'
      ],
    ],
  });

  const copyPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:copy'
      ],
    ],
  });

  const deleteIncidentTemplate =
    useDeleteIncidentTemplate({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.delete
          ) as string,
        });
        toggle.remove();
      },
    });

  const duplicateIncidentTemplate =
    useDuplicateIncidentTemplate({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.duplicate
          ) as string,
        });
      },
    });

  const columns: ColumnsType<IncidentTemplateType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.id}
        />
      ),
      key: 'templateeventID',
      width: 200,
      ellipsis: true,
      render: (
        incidentTemplate: IncidentTemplateType
      ) => (
        <Typography.Link
          onClick={() => onEdit?.(incidentTemplate)}
        >
          {incidentTemplate.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.name}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.status}
        />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 200,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={[
            {
              key: 'inactive',
              label: tokens.common.status.inactive,
              color: 'rgba(69,85,96,0.55)',
            },
          ]}
        />
      ),
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.incidentTemplate.createdDt
          }
        />
      ),
      key: 'createdDt',
      dataIndex: 'createdDt',
      width: 180,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.incidentTemplate.updatedDt
          }
        />
      ),
      key: 'updatedDt',
      dataIndex: 'updatedDt',
      width: 180,
      render: renderDate,
    },
    {
      key: 'edit',
      width: 50,
      render: (
        incidentTemplate: IncidentTemplateType
      ) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id={tokens.common.edit} />
              ),
              icon: <EditOutlined />,
              onClick: () => onEdit?.(incidentTemplate),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              icon: <DeleteOutlined />,
              onClick: () =>
                toggle.remove(incidentTemplate),
              disabled: !deletePermission.isAllow,
            },
            {
              key: 'duplicate',
              label: (
                <IntlMessage
                  id={tokens.common.duplicate}
                />
              ),
              icon: <CopyOutlined />,
              onClick: () =>
                duplicateIncidentTemplate.submit(
                  incidentTemplate.templateeventID
                ),
              disabled: !copyPermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.list}
        />
      }
      extra={
        <>
          <InputSearch
            className="mr-2"
            search={search}
            onSearch={onSearch}
          />
          {ColumnTransfer}
        </>
      }
    >
      <FallbackError isError={isError}>
        <Table
          rowKey="templateeventID"
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          loading={
            isLoading ||
            duplicateIncidentTemplate.isLoading
          }
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          title={
            <IntlMessage
              id={
                tokens.dataBreach.incidentTemplate.delete
              }
            />
          }
          identifier={toggle?.data?.name}
          onOk={() =>
            deleteIncidentTemplate.submit(
              toggle?.data?.templateeventID
            )
          }
          okButtonProps={{
            loading: deleteIncidentTemplate.isLoading,
          }}
        />
      </FallbackError>
    </Card>
  );
};
