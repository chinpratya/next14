import { DownOutlined } from '@ant-design/icons';
import { useSetState } from '@mantine/hooks';
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnAction,
  usePagination,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddDisclosureActorOfActivity } from '../../api/add-disclosure-actor-of-activity';
import { useListDisclosureActorOfActivity } from '../../api/list-disclosure-actor-of-activity';
import { useRemoveDisclosureActorOfActivity } from '../../api/remove-disclosure-actor-of-activity';
import {
  ActivityDataProcessor,
  ActivityDisclosureActor,
} from '../../types';
import { ActivityActorPicker } from '../activity-actor-picker';

import { ActivityDisclosureActorListPurpose } from './activity-disclosure-actor-list-purpose';

export type ActivityDisclosureActorListProps = {
  activityId: string;
};

type ActivityDisclosureActorListState = {
  actorType?: 'data-controller' | 'data-processor';
  openAddActor: boolean;
  openDeleteActor: boolean;
  currentActor: ActivityDisclosureActor | null;
};

export const ActivityDisclosureActorList = ({
  activityId,
}: ActivityDisclosureActorListProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [actorListState, setActorListState] =
    useSetState<ActivityDisclosureActorListState>({
      openAddActor: false,
      openDeleteActor: false,
      currentActor: null,
    });

  const handleAddActor = (
    actorType: ActivityDisclosureActorListState['actorType']
  ) => {
    setActorListState({ openAddActor: true, actorType });
  };

  const handleDeleteActor = (
    currentActor: ActivityDisclosureActorListState['currentActor']
  ) => {
    setActorListState({
      openDeleteActor: true,
      currentActor,
    });
  };

  const onClose = () => {
    setActorListState({
      openAddActor: false,
      openDeleteActor: false,
      currentActor: null,
      actorType: undefined,
    });
  };

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const columnAction =
    useColumnAction<ActivityDisclosureActor>({
      usages: ['delete'],
      onAction: {
        delete: handleDeleteActor,
      },
      disabled: {
        delete: !editPermission.isAllow,
      },
    });

  const { data, isLoading, isError } =
    useListDisclosureActorOfActivity({
      activityId,
      page,
      pageSize,
    });

  const addDisclosureActorOfActivity =
    useAddDisclosureActorOfActivity({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.disclosure.add'
          ) as string,
        });
        onClose();
      },
    });

  const removeDisclosureActorOfActivity =
    useRemoveDisclosureActorOfActivity({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.disclosure.delete'
          ) as string,
        });
        onClose();
      },
    });

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.add.dataController" />
      ),
      key: 'data-controller',
      onClick: () => handleAddActor('data-controller'),
    },
    {
      label: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.add.dataProcessor" />
      ),
      key: 'data-processor',
      onClick: () => handleAddActor('data-processor'),
    },
  ];

  const columns: ColumnsType<ActivityDisclosureActor> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.personalType" />
      ),
      key: 'personalType',
      dataIndex: 'personalType',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.actorType" />
      ),
      key: 'actorType',
      dataIndex: 'actorType',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.country" />
      ),
      key: 'country',
      dataIndex: 'country',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.organizationType" />
      ),
      key: 'organizationType',
      dataIndex: 'organizationType',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.purposeId" />
      ),
      key: 'purposeId',
      width: 200,
      render: (actor: ActivityDisclosureActor) => {
        const keyDisable = data?.data
          .filter(
            (v) =>
              v.actorID === actor.actorID &&
              v.ObjectUUID !== actor.ObjectUUID
          )
          .map((actor) => actor.purposeID);

        return (
          <>
            <ActivityDisclosureActorListPurpose
              purposeId={actor.purposeID ?? ''}
              activityId={activityId}
              actorId={actor.ObjectUUID}
              keyDisable={keyDisable as string[]}
            />
            {!actor.purposeID ||
            actor.purposeID === '' ? (
              <Typography.Text className="text-danger mt-1">
                *{' '}
                <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.purposeIdValidation" />
              </Typography.Text>
            ) : null}
          </>
        );
      },
    },
    columnAction,
  ];

  const {
    actorType,
    currentActor,
    openDeleteActor,
    openAddActor,
  } = actorListState;

  const disabledRowKeys = data?.data.map(
    (actor) => actor.actorID
  );

  const onAddDisclosureActor = (
    actors: ActivityDataProcessor[]
  ) => {
    const actorId = actors[0].dataProcessorID;
    if (!actorId) return;
    addDisclosureActorOfActivity.submit(actorId);
  };

  const removeDisclosureActor = () => {
    if (!currentActor) return;
    removeDisclosureActorOfActivity.submit(
      currentActor.ObjectUUID
    );
  };

  return (
    <FallbackError isError={isError}>
      <Card
        bordered={false}
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.title" />
        }
        extra={
          <Dropdown
            menu={{ items: menuItems }}
            disabled={!editPermission.isAllow}
          >
            <Button type="primary">
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.add" />{' '}
              <DownOutlined />
            </Button>
          </Dropdown>
        }
      >
        <Table
          rowKey="ObjectUUID"
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          tableLayout="fixed"
          scroll={{ x: 1150 }}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={openDeleteActor}
          onCancel={onClose}
          identifier={currentActor?.name}
          okButtonProps={{
            loading:
              removeDisclosureActorOfActivity.isLoading,
          }}
          onDelete={removeDisclosureActor}
        />
      </Card>
      <ActivityActorPicker
        open={openAddActor}
        actorType={actorType}
        onCancel={onClose}
        onFinish={onAddDisclosureActor}
        okButtonProps={{
          loading: addDisclosureActorOfActivity.isLoading,
        }}
        disabledRowKeys={disabledRowKeys}
      />
    </FallbackError>
  );
};
