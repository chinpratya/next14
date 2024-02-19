import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnAction,
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataControllers,
  DataControllerPicker,
} from '../../../data-controller';
import { useAddActivityActor } from '../../api/add-activity-actors';
import { useListActivityActor } from '../../api/list-activity-actor';
import { useRemoveActivityActor } from '../../api/remove-activity-actor';
import { ActivityActor } from '../../types';

export type ActivityActorListProps = {
  activityId: string;
  actorType?:
    | 'data-controller'
    | 'data-processor'
    | 'data-protection-officer'
    | 'receipt';
};

const ACTOR_TYPE_LABELS = {
  'data-controller': (
    <IntlMessage id="dataMapping.activity.activityDetail.dataController" />
  ),
  'data-processor': (
    <IntlMessage id="dataMapping.activity.activityDetail.dataProcessor" />
  ),
  'data-protection-officer': (
    <IntlMessage id="dataMapping.activity.activityDetail.dataProtectionOfficer" />
  ),
  receipt: (
    <IntlMessage id="dataMapping.activity.activityDetail.receipt" />
  ),
};

export const ActivityActorList = ({
  activityId,
  actorType = 'data-controller',
}: ActivityActorListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const columnAction = useColumnAction<ActivityActor>({
    usages: ['delete'],
    onAction: {
      delete: toggle.remove,
    },
  });
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const { data, isLoading, isError } =
    useListActivityActor({
      activityId,
      actorType,
    });

  const addActivityActors = useAddActivityActor({
    activityId,
    actorType,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.actor.add'
        ) as string,
      });
      toggle.create();
    },
  });

  const removeActivityActor = useRemoveActivityActor({
    activityId,
    actorType,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.actor.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<ActivityActor> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.tel" />
      ),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.type" />
      ),
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.activityDetail.organizationType" />
      ),
      dataIndex: 'organizationType',
      key: 'organizationType',
      width: 150,
    },
    columnAction,
  ];

  const existingDataControllersId = data?.data.map(
    (dataController) => dataController.ObjectUUID
  );

  const handleAdd = (
    dataControllers: DataControllers[]
  ) => {
    const dataControllerIds = dataControllers.map(
      (dataController) => dataController.dataProcessorID
    );
    addActivityActors.submit(dataControllerIds);
  };

  return (
    <>
      <FallbackError isError={isError}>
        <Card
          title={ACTOR_TYPE_LABELS[actorType]}
          extra={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
              disabled={!editPermission.isAllow}
            >
              <IntlMessage id="dataMapping.activity.activityDetail.add" />
              {ACTOR_TYPE_LABELS[actorType]}
            </Button>
          }
        >
          <Table
            rowKey="ObjectUUID"
            loading={isLoading}
            dataSource={data?.data}
            columns={columns}
            pagination={false}
          />
          <Pagination
            total={data?.totalRecord}
            current={page}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </Card>
      </FallbackError>
      <DataControllerPicker
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
        position={actorType}
        onFinish={handleAdd}
        okButtonProps={{
          loading: addActivityActors.isLoading,
        }}
        existingDataControllersId={
          existingDataControllersId
        }
      />
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.name}
        onDelete={() =>
          removeActivityActor.submit(
            toggle.data?.ObjectUUID
          )
        }
        okButtonProps={{
          loading: removeActivityActor.isLoading,
        }}
      />
    </>
  );
};
