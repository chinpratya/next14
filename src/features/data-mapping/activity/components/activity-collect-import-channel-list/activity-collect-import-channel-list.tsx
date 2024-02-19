import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Collapse,
  Select,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssetPicker, Asset } from '../../../asset';
import { useAddActivityCollectChannel } from '../../api/add-activity-collect-channel';
import { useDeleteActivityCollectChannel } from '../../api/delete-activity-collect-channel';
import { useGetActivityMeta } from '../../api/get-activity-meta';
import { useListActivityCollectChannel } from '../../api/list-activity-collect-channel';
import { useUpdateActivityCollectChannel } from '../../api/update-activity-collect-channel';
import { ActivityCollectImportChannel } from '../../types';

type SelectObtainingDataProps = {
  value: string[];
  activityId: string;
  channelId: string;
};

const SelectObtainingData = ({
  value,
  activityId,
  channelId,
}: SelectObtainingDataProps) => {
  const { t } = useTranslation();
  const meta = useGetActivityMeta({});
  const { showNotification } = useNotifications();

  const update = useUpdateActivityCollectChannel({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.update'
        ) as string,
      });
    },
  });

  return (
    <Select
      defaultValue={value}
      mode="multiple"
      className="w-100"
      options={meta?.data?.sourceMethod.map((source) => ({
        label: source.name,
        value: source.ObjectUUID,
      }))}
      onChange={(value: string[]) => {
        update.submit({
          channelId,
          sourceID: value,
        });
      }}
      loading={update.isLoading}
    />
  );
};

type ActivityCollectImportChannelListProps = {
  activityId: string;
};

export const ActivityCollectImportChannelList = ({
  activityId,
}: ActivityCollectImportChannelListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { Pagination } = usePagination();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useListActivityCollectChannel(activityId);

  const existingDataAssetId = _.map(
    data?.data,
    (v) => v.assetID
  );

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });
  const addAsset = useAddActivityCollectChannel({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.chanel.add'
        ) as string,
      });
      toggle.create();
    },
  });

  const deleteChannel = useDeleteActivityCollectChannel({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.chanel.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onAddChannel = (value: Asset[]) => {
    const assetId = _.map(value, (v) => v.assetID);
    if (assetId.length > 10) {
      showNotification({
        type: 'error',
        message: 'cannot select more than 10',
      });
    } else {
      addAsset.submit(assetId);
    }
  };

  const columns: ColumnsType<ActivityCollectImportChannel> =
    [
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.name" />
        ),
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.group" />
        ),
        dataIndex: 'group',
        key: 'group',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.country" />
        ),
        dataIndex: 'country',
        key: 'country',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.owner" />
        ),
        dataIndex: 'owner',
        key: 'owner',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.organization" />
        ),
        dataIndex: 'organization',
        key: 'organization',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.importChannel.source" />
        ),
        key: 'sourceID',
        width: 250,
        render: (
          source: ActivityCollectImportChannel
        ) => (
          <SelectObtainingData
            value={source.sourceID}
            activityId={activityId}
            channelId={source.assetID}
          />
        ),
      },
      {
        key: 'action',
        width: 50,
        align: 'right',
        render: (data: ActivityCollectImportChannel) => (
          <DropdownTable
            items={[
              {
                key: 'delete',
                label: (
                  <IntlMessage id="dataMapping.activity.collect.importChannel.delete" />
                ),
                icon: <DeleteOutlined />,
                onClick: () => toggle.remove(data),
                disabled: !editPermission.isAllow,
              },
            ]}
          />
        ),
      },
    ];

  return (
    <FallbackError isError={isError}>
      <Collapse defaultActiveKey={1} className="my-3">
        <Collapse.Panel
          header={
            <IntlMessage id="dataMapping.activity.collect.importChannel.title" />
          }
          key={1}
        >
          <Card
            className="border-0"
            extra={
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={toggle.create}
                disabled={!editPermission.isAllow}
              >
                {' '}
                <IntlMessage id="dataMapping.activity.collect.importChannel.add" />
              </Button>
            }
          >
            <Table
              rowKey="assetID"
              tableLayout="fixed"
              scroll={{
                x: 1050,
              }}
              columns={columns}
              dataSource={data?.data ?? []}
              pagination={false}
              loading={isLoading}
            />
            <Pagination total={data?.totalRecord} />
            <AssetPicker
              okButtonProps={{
                loading: addAsset.isLoading,
              }}
              open={toggle.openCreate}
              onClose={() => toggle.create()}
              onFinish={onAddChannel}
              existingAssetId={existingDataAssetId}
            />
            <DeleteModal
              open={toggle.openRemove}
              identifier={toggle.data?.name}
              okButtonProps={{
                loading: deleteChannel.isLoading,
              }}
              onCancel={() => toggle.remove()}
              onDelete={() =>
                deleteChannel.submit({
                  activityId,
                  channelId: toggle.data.assetID,
                })
              }
            />
          </Card>
        </Collapse.Panel>
      </Collapse>
    </FallbackError>
  );
};
