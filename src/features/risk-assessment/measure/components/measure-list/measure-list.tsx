import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { renderDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteMeasure } from '../../api/delete-measure';
import { useListMeasure } from '../../api/list-measure';
import { MeasureType } from '../../types';

export type MeasureListProps = {
  onEdit?: (measure: MeasureType) => void;
};

export const MeasureList = ({
  onEdit,
}: MeasureListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<MeasureType>();

  const { showNotification } = useNotifications();

  const { debouncedSearch, search, onSearch } =
    useSearch();

  const deleteMeasure = useDeleteMeasure({
    onSuccess: () => {
      toggle.remove();
      showNotification({
        message: t(
          tokens.riskAssessment.riskMeasures.notifications
            .delete
        ) as string,
        type: 'success',
      });
    },
  });

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListMeasure({
    page,
    pageSize,
    search: debouncedSearch,
  });

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:assessmentrisk:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:assessmentrisk:delete'
      ],
    ],
  });

  const columns: ColumnsType<MeasureType> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskMeasures.name}
        />
      ),
      key: 'name',
      width: 300,
      render: (record) => (
        <Typography.Link onClick={() => onEdit?.(record)}>
          {record.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskMeasures.tags}
        />
      ),
      dataIndex: 'tagName',
      key: 'label',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskMeasures.createdDt
          }
        />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      render: renderDate,
      width: 180,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskMeasures.updatedDt
          }
        />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      render: renderDate,
      width: 180,
    },
    {
      key: 'action',
      width: 50,
      render: (record) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id={tokens.common.edit} />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(record),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(record),
              disabled: !deletePermission.isAllow,
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
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskMeasures.listTitle
            }
          />
        }
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              placeholder={
                t(
                  tokens.riskAssessment.riskMeasures
                    .search
                ) as string
              }
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deleteMeasure.submit(toggle?.data?.measuredID)
          }
          identifier={toggle?.data?.name}
          okButtonProps={{
            loading: deleteMeasure.isLoading,
          }}
        />
      </Card>
    </FallbackError>
  );
};
