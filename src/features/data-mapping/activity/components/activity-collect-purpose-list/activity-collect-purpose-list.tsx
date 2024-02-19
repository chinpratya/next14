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

import { useAddActivityCollectPurpose } from '../../api/add-activity-collect-purpose';
import { useDeleteActivityCollectPurpose } from '../../api/delete-activity-collect-purpose';
import { useListActivityCollectPurpose } from '../../api/list-activity-collect-purpose';
import {
  ActivityPurposeCollect,
  ActivityPurposeList,
} from '../../types';
import { ActivityCollectAddPurposeModal } from '../activity-collect-add-purpose-modal';

type ActivityCollectPurposeListProps = {
  activityId: string;
};
export const ActivityCollectPurposeList = ({
  activityId,
}: ActivityCollectPurposeListProps) => {
  const { t } = useTranslation();
  const { Pagination } = usePagination();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useListActivityCollectPurpose(activityId);
  const existingDataPurposeId = _.map(
    data?.data,
    (v) => v.purposeID
  );

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const deletePurpose = useDeleteActivityCollectPurpose({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.purpose.remove'
        ) as string,
      });
      toggle.remove();
    },
    activityId,
  });

  const addPurpose = useAddActivityCollectPurpose({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.purpose.add'
        ) as string,
      });
      toggle.create();
    },
    activityId,
  });

  const columns: ColumnsType<ActivityPurposeCollect> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.purposeId" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.legalBasis" />
      ),
      dataIndex: 'legalBasis',
      key: 'legalBasis',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.group" />
      ),
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.collect.purpose.dataUsagePeriod" />
      ),
      key: 'dataUsagePeriod',
      width: 150,
      render: (dataUsage) => {
        const label = (
          <>
            {dataUsage?.dataUsagePeriod?.day > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.day}`}
                <IntlMessage id="dataMapping.activity.collect.purpose.dataUsagePeriod.day" />
              </span>
            ) : null}
            {dataUsage?.dataUsagePeriod?.month > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.month}`}
                <IntlMessage id="dataMapping.activity.collect.purpose.dataUsagePeriod.month" />
              </span>
            ) : null}
            {dataUsage?.dataUsagePeriod?.year > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.year}`}
                <IntlMessage id="dataMapping.activity.collect.purpose.dataUsagePeriod.year" />
              </span>
            ) : null}
            {dataUsage?.dataUsagePeriod?.day === 0 &&
            dataUsage?.dataUsagePeriod?.month === 0 &&
            dataUsage?.dataUsagePeriod?.year === 0
              ? dataUsage?.dataUsagePeriod?.description
              : null}
          </>
        );

        return label;
      },
    },
    {
      key: 'action',
      width: 50,
      align: 'right',
      render: (data: ActivityPurposeCollect) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: (
                <IntlMessage id="dataMapping.activity.collect.purpose.delete" />
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
  const onAddPurpose = (value: ActivityPurposeList[]) => {
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
      <Collapse defaultActiveKey={1}>
        <Collapse.Panel
          header={
            <IntlMessage id="dataMapping.activity.collect.purpose.title" />
          }
          key={1}
        >
          <Card
            className="border-0"
            extra={
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => toggle.create()}
                disabled={!editPermission.isAllow}
              >
                {' '}
                <IntlMessage id="dataMapping.activity.collect.purpose.add" />
              </Button>
            }
          >
            <Table
              rowKey="purposeID"
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
            <ActivityCollectAddPurposeModal
              loading={addPurpose.isLoading}
              open={toggle.openCreate}
              onClose={() => toggle.create()}
              onFinish={onAddPurpose}
              existingDataPurposeId={
                existingDataPurposeId
              }
              activityId={activityId}
            />
            <DeleteModal
              open={toggle.openRemove}
              identifier={toggle.data?.name}
              okButtonProps={{
                loading: deletePurpose.isLoading,
              }}
              onCancel={() => toggle.remove()}
              onDelete={() =>
                deletePurpose.submit({
                  activityId,
                  purposeId: toggle.data.purposeID,
                })
              }
            />
          </Card>
        </Collapse.Panel>
      </Collapse>
    </FallbackError>
  );
};
