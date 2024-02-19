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
  useSearch,
  useToggle,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteAsset } from '../../api/delete-asset';
import { useListAsset } from '../../api/list-asset';
import { Asset } from '../../types';

export const AssetList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle<Asset>();
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
      permissions['pdpakit:datamap:asset:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:asset:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [permissions['pdpakit:datamap:asset:read']],
  });

  const { data, isLoading, isError } = useListAsset({
    page,
    pageSize,
    search: debouncedSearch,
  });

  const deleteAsset = useDeleteAsset({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.asset.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onEdit = (assetId: string) => {
    router.push(`${router.pathname}/${assetId}`);
  };

  const columns: ColumnsType<Asset> = [
    {
      title: (
        <IntlMessage id="dataMapping.asset.assetId" />
      ),
      key: 'assetID',
      width: 100,
      dataIndex: 'assetID',
      ellipsis: true,
    },
    {
      title: <IntlMessage id="dataMapping.asset.name" />,
      key: 'name',
      width: 150,
      ellipsis: true,
      render: (data: Asset) => (
        <Typography.Link
          href={`${router.pathname}/${data.assetID}`}
          disabled={!readPermission.isAllow}
        >
          {data.name}
        </Typography.Link>
      ),
    },
    {
      title: <IntlMessage id="dataMapping.asset.group" />,
      key: 'group',
      width: 100,
      dataIndex: 'group',
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.country" />
      ),
      key: 'country',
      width: 100,
      dataIndex: 'country',
    },
    {
      title: <IntlMessage id="dataMapping.asset.owner" />,
      key: 'owner',
      width: 100,
      ellipsis: true,
      dataIndex: 'owner',
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.organization" />
      ),
      key: 'organization',
      width: 130,
      dataIndex: 'organization',
      align: 'left',
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.organizationType" />
      ),
      key: 'organizationType',
      width: 150,
      dataIndex: 'organizationType',
      align: 'left',
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.createdDt" />
      ),
      key: 'created_dt',
      width: 150,
      dataIndex: 'created_dt',
      align: 'left',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.updatedDt" />
      ),
      key: 'updated_dt',
      width: 150,
      dataIndex: 'updated_dt',
      align: 'left',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (asset: Asset) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.asset.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit(asset.assetID),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.asset.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(asset),
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
          rowKey="assetID"
          dataSource={data?.data}
          columns={filteredColumns}
          scroll={{ x: 1100 }}
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
          loading={deleteAsset.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteAsset.submit(data?.assetID as string)
          }
        />
      </Card>
    </FallbackError>
  );
};
