import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
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
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteRiskMatrix } from '../../api/delete-risk-matrix';
import { useListRiskMatrix } from '../../api/list-risk-matrix';
import { RiskMatrix } from '../../types';
import { permissions } from '@/permissions';

export const RiskMatrixList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const toggle = useToggle<RiskMatrix>();

  const { showNotification } = useNotifications();

  const deleteRiskMatrix = useDeleteRiskMatrix({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.riskMatrix.notifications
            .delete
        ) as string,
      });
      toggle.remove();
    },
  });

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:delete'],
    ],
  });

  const { search, debouncedSearch, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListRiskMatrix({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const onEdit = (riskMatrixId: string) =>
    router.push(`${router.asPath}/${riskMatrixId}`);

  const columns: ColumnsType<RiskMatrix> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.ObjectUUID}
        />
      ),
      key: 'ObjectUUID',
      width: 200,
      ellipsis: true,
      render: (riskMatrix) => (
        <Typography.Link
          onClick={() => onEdit(riskMatrix.ObjectUUID)}
        >
          {riskMatrix.ObjectUUID}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.name}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.createdDt}
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
          id={tokens.dataBreach.riskMatrix.updatedDt}
        />
      ),
      key: 'updatedDt',
      dataIndex: 'updatedDt',
      width: 180,
      render: renderDate,
    },
    {
      key: 'action',
      width: 80,
      render: (riskMatrix) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id={tokens.common.edit} />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () =>
                onEdit(riskMatrix.ObjectUUID),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(riskMatrix),
              disabled: !deletePermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.list}
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
        <Table
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
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
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.delete}
          />
        }
        identifier={toggle?.data?.name}
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteRiskMatrix.submit(
            toggle?.data?.ObjectUUID
          )
        }
        okButtonProps={{
          loading: deleteRiskMatrix.isLoading,
        }}
      />
    </FallbackError>
  );
};
