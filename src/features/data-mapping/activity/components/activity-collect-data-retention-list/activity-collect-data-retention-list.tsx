import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Collapse, Table } from 'antd';
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
// import { ModalAddAsset } from '../../../shared';
import { useAddActivityCollectDataRetention } from '../../api/add-activity-collect-data-retention';
import { useDeleteActivityCollectDataRetention } from '../../api/delete-activity-collect-data-retention';
import { useListActivityCollectDataRetention } from '../../api/list-activity-collect-data-retention';
import { ActivityCollectDataRetention } from '../../types';

type ActivityCollectDataRetentionListProps = {
  activityId: string;
};

export const ActivityCollectDataRetentionList = ({
  activityId,
}: ActivityCollectDataRetentionListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { Pagination } = usePagination();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useListActivityCollectDataRetention(activityId);

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

  const deleteDataRetention =
    useDeleteActivityCollectDataRetention({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.collect.dataRetention.delete'
          ) as string,
        });
        toggle.remove();
      },
    });

  const addAsset = useAddActivityCollectDataRetention({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.dataRetention.add'
        ) as string,
      });
      toggle.create();
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

  const columns: ColumnsType<ActivityCollectDataRetention> =
    [
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.dataRetention.name" />
        ),
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.dataRetention.group" />
        ),
        dataIndex: 'group',
        key: 'group',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.dataRetention.country" />
        ),
        dataIndex: 'country',
        key: 'tel',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.dataRetention.owner" />
        ),
        dataIndex: 'owner',
        key: 'owner',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.collect.dataRetention.organization" />
        ),
        dataIndex: 'organization',
        key: 'organization',
        width: 150,
      },
      {
        key: 'action',
        width: 50,
        align: 'right',
        render: (data: ActivityCollectDataRetention) => (
          <DropdownTable
            items={[
              {
                key: 'delete',
                label: (
                  <IntlMessage id="dataMapping.activity.collect.dataRetention.delete" />
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
            <IntlMessage id="dataMapping.activity.collect.dataRetention.title" />
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
                <IntlMessage id="dataMapping.activity.collect.dataRetention.add" />
              </Button>
            }
          >
            <Table
              rowKey="assetID"
              tableLayout="fixed"
              scroll={{
                x: 900,
              }}
              columns={columns}
              dataSource={data?.data ?? []}
              pagination={false}
              loading={isLoading}
            />
            <Pagination total={data?.totalRecord} />
            <DeleteModal
              open={toggle.openRemove}
              identifier={toggle.data?.name}
              okButtonProps={{
                loading: deleteDataRetention.isLoading,
              }}
              onCancel={() => toggle.remove()}
              onDelete={() =>
                deleteDataRetention.submit({
                  activityId,
                  dataRetentionId: toggle.data.assetID,
                })
              }
            />
            <AssetPicker
              okButtonProps={{
                loading: addAsset.isLoading,
              }}
              open={toggle.openCreate}
              onClose={() => toggle.create()}
              onFinish={onAddChannel}
              existingAssetId={existingDataAssetId}
            />
          </Card>
        </Collapse.Panel>
      </Collapse>
    </FallbackError>
  );
};
