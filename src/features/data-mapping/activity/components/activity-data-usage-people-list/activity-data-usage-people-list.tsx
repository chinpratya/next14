import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/features/admin';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { ModalAddRelatedOrganizations } from '../../../shared';
import { useAddActivityUseAndPublishUsageRelatedPerson } from '../../api/add-activity-use-and-publish-usage-related-person';
import { useDeleteActivityUseAndPublishUsageRelatedPerson } from '../../api/delete-activit-use-and-publish-usage-related-person';
import { useListActivityUseAndPublishUsageRelatedPerson } from '../../api/list-activity-use-and-publish-usage-related-person';
import { useUpdateActivityUseAndPublishUsageRelatedPerson } from '../../api/update-activity-use-and-publish-usage-related-person';
import { ActivityRelatedPerson } from '../../types';

type InputDescriptionProps = {
  value: string;
  activityId: string;
  peopleId: string;
};

const InputDescription = ({
  value,
  activityId,
  peopleId,
}: InputDescriptionProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [valueInput, setValueInput] = useState(value);

  const updateDescription =
    useUpdateActivityUseAndPublishUsageRelatedPerson({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.people.update'
          ) as string,
        });
      },
      activityId,
    });

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setValueInput(event.currentTarget.value);
  };

  const onUpdateDescription = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      updateDescription.submit({
        source: inputValue,
        peopleId: peopleId,
      });
    }
  };

  return (
    <Input
      onChange={onChange}
      placeholder={
        t(
          'dataMapping.activity.useAndPublic.usage.people.descriptionPlaceholder'
        ) as string
      }
      value={valueInput}
      onPressEnter={onUpdateDescription}
    />
  );
};

type ActivityDataUsagePeopleListProps = {
  activityId: string;
};

export const ActivityDataUsagePeopleList = ({
  activityId,
}: ActivityDataUsagePeopleListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } =
    useListActivityUseAndPublishUsageRelatedPerson({
      activityId,
    });

  const existingDataUserId = _.map(
    data?.data,
    (v) => v.peopleID
  );

  const addUser =
    useAddActivityUseAndPublishUsageRelatedPerson({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.people.add'
          ) as string,
        });
        toggle.create();
      },
      activityId,
    });

  const deleteUsagePeople =
    useDeleteActivityUseAndPublishUsageRelatedPerson({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.people.delete'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<ActivityRelatedPerson> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.peopleId" />
      ),
      dataIndex: 'peopleID',
      key: 'peopleID',
      align: 'left',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.name" />
      ),
      key: 'name',
      width: 200,
      render: (purpose: ActivityRelatedPerson) => (
        <span>{purpose.name}</span>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.description" />
      ),
      key: 'description',
      width: 250,
      render: (data: ActivityRelatedPerson) => (
        <InputDescription
          value={data?.description ?? ''}
          activityId={activityId}
          peopleId={data?.peopleID ?? ''}
        />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (data: ActivityRelatedPerson) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(data),
            },
          ]}
        />
      ),
    },
  ];

  const onAddUser = (value: User[]) => {
    const userId = _.map(value, (v) => v.userId);
    console.log('userId', userId);

    addUser.submit(userId);
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.title" />
        }
        bordered={false}
        extra={
          <Button
            type="primary"
            onClick={() => toggle.create()}
          >
            <PlusCircleOutlined />{' '}
            <IntlMessage id="dataMapping.activity.useAndPublic.usage.people.add" />
          </Button>
        }
      >
        <Table
          rowKey="peopleID"
          loading={isLoading}
          columns={columns}
          pagination={false}
          dataSource={data?.data ?? []}
          tableLayout="fixed"
          scroll={{ x: 800 }}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <ModalAddRelatedOrganizations
          open={toggle.openCreate}
          onClose={() => toggle.create()}
          existingDataUserId={existingDataUserId}
          onFinish={onAddUser}
          okButtonProps={{ loading: addUser.isLoading }}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name}
          okButtonProps={{
            loading: deleteUsagePeople.isLoading,
          }}
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deleteUsagePeople.submit(toggle.data.peopleID)
          }
        />
      </Card>
    </FallbackError>
  );
};
