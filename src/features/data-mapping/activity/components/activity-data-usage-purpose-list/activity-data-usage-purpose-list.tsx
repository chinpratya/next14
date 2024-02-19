import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddActivityUseAndPublishUsagePurpose } from '../../api/add-activity-use-and-publish-usage-purpose';
import { useDeleteActivityUseAndPublishUsagePurpose } from '../../api/delete-activit-use-and-publish-usage-purpose';
import { useListActivityUseAndPublishUsagePurpose } from '../../api/list-activity-use-and-publish-usage-purpose';
import { ActivityUsagePurpose } from '../../types';
import { ActivityDataUsagePurposeListAddPurposeModal } from '../activity-data-usage-purpose-add-purpose-modal';

type ActivityDataUsagePurposeListProps = {
  activityId: string;
};
export const ActivityDataUsagePurposeList = ({
  activityId,
}: ActivityDataUsagePurposeListProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } =
    useListActivityUseAndPublishUsagePurpose({
      activityId,
      page,
      pageSize,
    });

  const existingDataPurposeId = _.map(
    data?.data,
    (v) => v.purposeID
  );

  const addPurpose =
    useAddActivityUseAndPublishUsagePurpose({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.purpose.add'
          ) as string,
        });
        toggle.create();
      },
      activityId,
    });

  const deleteUsagePurpose =
    useDeleteActivityUseAndPublishUsagePurpose({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.purpose.delete'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<ActivityUsagePurpose> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.purposeId" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      align: 'left',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.name" />
      ),
      key: 'purposeName',
      width: 200,
      render: (purpose: ActivityUsagePurpose) => (
        <span>{purpose.name}</span>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.legalBasis" />
      ),
      key: 'legalBasis',
      dataIndex: 'legalBasis',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.purpose.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (data: ActivityUsagePurpose) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.activity.useAndPublic.purpose.delete" />
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

  const onAddPurpose = (
    value: ActivityUsagePurpose[]
  ) => {
    const purposeId = _.map(value, (v) => v.purposeID);
    if (purposeId.length > 10) {
      showNotification({
        type: 'error',
        message: 'cannot select more than 10',
      });
    } else {
      addPurpose.submit(purposeId);
    }
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.title" />
        }
        bordered={false}
        extra={
          <Button
            type="primary"
            onClick={() => toggle.create()}
          >
            <PlusCircleOutlined />{' '}
            <IntlMessage id="dataMapping.activity.useAndPublic.usage.purpose.add" />
          </Button>
        }
      >
        <Table
          rowKey="purposeID"
          loading={isLoading}
          columns={columns}
          pagination={false}
          dataSource={data?.data ?? []}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <ActivityDataUsagePurposeListAddPurposeModal
          activityId={activityId}
          loading={addPurpose.isLoading}
          open={toggle.openCreate}
          onClose={() => toggle.create()}
          onFinish={onAddPurpose}
          existingDataPurposeId={existingDataPurposeId}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name}
          okButtonProps={{
            loading: deleteUsagePurpose.isLoading,
          }}
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deleteUsagePurpose.submit(
              toggle.data.purposeID
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
