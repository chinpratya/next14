import {
  EditOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Typography,
  Switch,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { useListTags } from '@/features/data-mapping';
import {
  useSearch,
  usePagination,
  useColumnFiltered,
  useToggle,
  useFilter,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { PreviewIcon } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListConsentManagementCollectionPoint } from '../../api/list-collection-point';
import { useUpdateCollectionPointUsing } from '../../api/update-collection-point-using';
import { ConsentCollectionPoint } from '../../types';
import { CollectionPointGetScript } from '../collection-point-get-script';
import { CollectionPointPreview } from '../collection-point-preview';

type SwitchUsingType = {
  checked: boolean;
  collectionPointId: string;
};

const SwitchUsing = ({
  checked,
  collectionPointId,
}: SwitchUsingType) => {
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const updateUsing = useUpdateCollectionPointUsing({
    collectionPointId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'เปลี่ยนการใช้งานเรียบร้อย',
      });
      toggle.change();
    },
  });

  return (
    <>
      <Switch
        checked={checked}
        onChange={() => toggle.change()}
        checkedChildren={
          <IntlMessage id="consentManagement.collectionPoint.table.isUsing.on" />
        }
        unCheckedChildren={
          <IntlMessage id="consentManagement.collectionPoint.table.isUsing.off" />
        }
      />
      <Modal
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.isUsing.off.title" />
        }
        width={600}
        open={toggle.openChange}
        onCancel={() => toggle.change()}
        onOk={() => updateUsing.submit(!checked)}
        okButtonProps={{
          loading: updateUsing.isLoading,
        }}
      >
        <IntlMessage id="consentManagement.collectionPoint.table.isUsing.off.desc" />
      </Modal>
    </>
  );
};

export const CollectionPointList = () => {
  const router = useRouter();
  const toggle = useToggle();
  const { onSearch, search, debouncedSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { filters, columnFilter, filterDropdown } =
    useFilter<ConsentCollectionPoint>();

  const { data, isLoading, isError } =
    useListConsentManagementCollectionPoint({
      search: debouncedSearch,
      page,
      pageSize,
      filters,
    });

  const { data: tags } = useListTags({});

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions[
        'pdpakit:consent:collectionpoint:update'
      ],
    ],
  });

  const onEditCollectionPoint = (
    collectionPointId: string
  ) => {
    router.push(`${router.asPath}/${collectionPointId}`);
  };

  const getColumns =
    (): ColumnsType<ConsentCollectionPoint> => {
      return [
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.name" />
          ),
          key: 'name',
          width: 150,
          render: (
            Collection: ConsentCollectionPoint
          ) => (
            <Typography.Link
              href={`collection-point/${Collection.CollectionPointID}`}
            >
              {Collection?.name}
            </Typography.Link>
          ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.identifier" />
          ),
          dataIndex: 'identifier',
          key: 'identifier',
          width: 150,
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.activity" />
          ),
          dataIndex: 'activity',
          key: 'activity',
          width: 150,
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.activityGroup" />
          ),
          dataIndex: 'activityGroup',
          key: 'activityGroup',
          width: 150,
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.DoubleOptIn" />
          ),
          dataIndex: 'doubleOptIn',
          key: 'doubleOptIn',
          width: 150,
          render: (doubleOptIn: boolean) =>
            doubleOptIn ? (
              <IntlMessage id="consentManagement.collectionPoint.table.DoubleOptIn.true" />
            ) : (
              <IntlMessage id="consentManagement.collectionPoint.table.DoubleOptIn.false" />
            ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.preference" />
          ),
          dataIndex: 'isPreference',
          key: 'isPreference',
          width: 150,
          render: (isPreference: boolean) =>
            isPreference ? (
              <IntlMessage id="consentManagement.collectionPoint.table.preference.true" />
            ) : (
              <IntlMessage id="consentManagement.collectionPoint.table.preference.false" />
            ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.status" />
          ),
          dataIndex: 'status',
          key: 'status',
          width: 150,
          render: (status: string) => (
            <ShowTagStatus status={status} />
          ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.version" />
          ),
          dataIndex: 'version',
          key: 'version',
          width: 150,
          ...columnFilter(),
          filters: _.uniqBy(data?.data, 'version')?.map(
            (value) => ({
              text: `${value.version}`,
              value: value.version,
            })
          ),
          filterDropdown: filterDropdown('version'),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.createdDt" />
          ),
          dataIndex: 'createdDt',
          key: 'createdDt',
          width: 200,
          render: (date: string) => (
            <ShowTagDate date={date} />
          ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.updatedDt" />
          ),
          dataIndex: 'updatedDt',
          key: 'updatedDt',
          width: 200,
          render: (date: string) => (
            <ShowTagDate date={date} />
          ),
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.isUsing" />
          ),
          key: 'isUsing',
          width: 100,
          render: (
            CollectionPoint: ConsentCollectionPoint
          ) => {
            const { isUsing, CollectionPointID } =
              CollectionPoint;

            return (
              <SwitchUsing
                checked={isUsing}
                collectionPointId={CollectionPointID}
              />
            );
          },
        },
        {
          title: (
            <IntlMessage id="consentManagement.collectionPoint.table.tags" />
          ),
          dataIndex: 'tagName',
          key: 'tagName',
          width: 150,
          ...columnFilter(),
          filters: _.uniqBy(tags?.data, 'name').map(
            (value) => ({
              text: value.name,
              value: value.tagID,
            })
          ),
          filterDropdown: filterDropdown('tagName'),
          render: (tags) =>
            tags?.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            )) ?? '-',
        },
        {
          key: 'action',
          width: 50,
          render: (
            collectionPoint: ConsentCollectionPoint
          ) => (
            <DropdownTable
              items={[
                {
                  key: 'edit',
                  icon: <EditOutlined />,
                  label: (
                    <IntlMessage id="consentManagement.collectionPoint.table.edit" />
                  ),
                  onClick: () =>
                    onEditCollectionPoint(
                      collectionPoint.CollectionPointID
                    ),
                  disabled: !editPermission.isAllow,
                },
                { type: 'divider' },
                {
                  key: 'preview',
                  icon: <PreviewIcon />,
                  label: (
                    <IntlMessage id="consentManagement.collectionPoint.table.preview" />
                  ),
                  onClick: () =>
                    toggle.preview(collectionPoint),
                },
                {
                  key: 'getScript',
                  icon: <CodeOutlined />,
                  label: (
                    <IntlMessage id="consentManagement.collectionPoint.table.getScript" />
                  ),
                  onClick: () =>
                    toggle.getScript(collectionPoint),
                },
              ]}
            />
          ),
        },
      ];
    };

  const { filteredColumnsKeys, ColumnTransfer } =
    useColumnFiltered({
      columns: getColumns(),
      loading: isLoading,
    });

  const filteredColumns = getColumns().filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.title" />
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
          rowKey="CollectionPointID"
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          pagination={false}
          scroll={{ x: 1050 }}
          tableLayout="fixed"
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <CollectionPointGetScript
          open={toggle.openGetScript}
          onCancel={() => toggle.getScript()}
          collectionPointId={
            (toggle.data?.CollectionPointID as string) ??
            ''
          }
        />
        <CollectionPointPreview
          open={toggle.openPreview}
          onClose={() => toggle.preview()}
          collectionPointId={
            (toggle.data?.CollectionPointID as string) ??
            ''
          }
        />
      </Card>
    </FallbackError>
  );
};
