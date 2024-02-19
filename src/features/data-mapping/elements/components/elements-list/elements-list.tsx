import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Typography, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { InputSearch } from '@/components/share-components/input-search';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteDataElement } from '../../api/delete-data-element';
import { useListDataElement } from '../../api/list-data-element';
import { DataElement } from '../../types';
import { ElementsEditModal } from '../elements-edit-modal';

export const ElementsList = () => {
  const { t } = useTranslation();
  const toggle = useToggle<DataElement>();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isError, isLoading } = useListDataElement(
    { page, pageSize, search: debouncedSearch }
  );
  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:elements:delete'],
    ],
  });
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:elements:update'],
    ],
  });
  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:elements:read'],
    ],
  });
  const deleteDataElement = useDeleteDataElement({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataElement.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<DataElement> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataElement.Id" />
      ),
      dataIndex: 'dataElementID',
      key: 'dataElementID',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataElement.name" />
      ),
      key: 'name',
      width: 200,
      render: (element) => (
        <Typography.Link
          onClick={() => toggle.edit(element)}
          disabled={!readPermission.isAllow}
        >
          {element?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataElement.dataClassification" />
      ),
      dataIndex: 'dataClassificationID',
      key: 'dataClassificationID',
      align: 'left',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={[
            {
              label:
                'dataMapping.dataElement.dataClassification.generalData',
              key: 'general-data',
              color: '#000',
            },
            {
              label:
                'dataMapping.dataElement.dataClassification.personalData',
              key: 'personal-data',
              color: '#009af9',
            },
            {
              label:
                'dataMapping.dataElement.dataClassification.sensitiveData',
              key: 'sensitive-data',
              color: '#f94631',
            },
          ]}
        />
      ),
    },

    {
      title: (
        <IntlMessage id="dataMapping.dataElement.createdDt" />
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
        <IntlMessage id="dataMapping.dataElement.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'last_updated_dt',
      align: 'left',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (element: DataElement) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.dataElement.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => toggle.edit(element),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.dataElement.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(element),
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
          rowKey="dataElementID"
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

        <ElementsEditModal
          open={toggle.openEdit}
          onCancel={toggle.edit}
          element={toggle.data}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteDataElement.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteDataElement.submit(
              data?.dataElementID as string
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
