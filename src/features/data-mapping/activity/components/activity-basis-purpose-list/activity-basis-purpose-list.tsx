import {
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { Purpose } from '../../../purpose';
import { useAddActivityBasisPurpose } from '../../api/add-activity-basis-purpose';
import { useListActivityBasisPurpose } from '../../api/list-activity-basis-purpose';
import { useRemoveActivityBasisPurpose } from '../../api/remove-activity-basis-purpose';
import { ActivityBasisPurposeType } from '../../types';

import { ActivityBasisPurposeAddPurposeModal } from './activity-basis-purpose-add-purpose-modal';
import { ActivityBasisPurposeDataCategoryList } from './activity-basis-purpose-data-category-list';
import { ActivityBasisPurposeModalEdit } from './activity-basis-purpose-modal-edit';

type ActivityBasisPurposeListProps = {
  activityId: string;
  basisId: string;
};

export const ActivityBasisPurposeList = ({
  activityId,
  basisId,
}: ActivityBasisPurposeListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const [current, setCurrent] = useState(0);

  const { data, isLoading, isError } =
    useListActivityBasisPurpose({
      activityId,
      basisId,
    });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const addBasisPurpose = useAddActivityBasisPurpose({
    activityId,
    basisId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.purpose.add'
        ) as string,
      });
      setCurrent(1);
    },
  });

  const onAddBasisPurpose = (value: Purpose[]) => {
    const purposeId = _.map(value, (v) => v.purposeID);
    if (purposeId.length > 10) {
      showNotification({
        type: 'error',
        message: 'cannot select more than 10',
      });
    } else {
      addBasisPurpose.submit(purposeId);
    }
  };

  const existingPurpose = data?.data.map(
    (purpose) => purpose.purposeID
  );

  const removeBasisPurpose =
    useRemoveActivityBasisPurpose({
      activityId,
      basisId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.purpose.remove'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<ActivityBasisPurposeType> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.purposeId" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.group" />
      ),
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataUsagePeriod" />
      ),
      key: 'dataUsagePeriod',
      width: 100,
      align: 'left',
      render: (dataUsage) => {
        const label = (
          <>
            {dataUsage?.dataUsagePeriod?.day > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.day}`}
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataUsagePeriod.day" />
              </span>
            ) : null}
            {dataUsage?.dataUsagePeriod?.month > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.month}`}
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataUsagePeriod.month" />
              </span>
            ) : null}
            {dataUsage?.dataUsagePeriod?.year > 0 ? (
              <span>
                {`${dataUsage?.dataUsagePeriod?.year}`}
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataUsagePeriod.year" />
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
      title: (
        <IntlMessage id="dataMapping.activity.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
      width: 200,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      key: 'action',
      width: 50,
      align: 'center',
      render: (purpose: ActivityBasisPurposeType) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.editPurpose" />
              ),
              icon: <EditOutlined />,
              onClick: () => toggle.edit(purpose),
              disabled: !editPermission.isAllow,
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(purpose),
              disabled: !editPermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.listPurpose" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => toggle.create()}
            disabled={!editPermission.isAllow}
          >
            {' '}
            <IntlMessage id="dataMapping.activity.lawfulBasis.basis.add" />
          </Button>
        }
        bordered={false}
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          rowKey="purposeID"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data ?? []}
          expandable={{
            expandedRowRender: (record) => (
              <ActivityBasisPurposeDataCategoryList
                activityId={activityId}
                basisId={basisId}
                purposeId={record.purposeID}
              />
            ),
          }}
          pagination={false}
        />
        <ActivityBasisPurposeAddPurposeModal
          loading={addBasisPurpose.isLoading}
          open={toggle.openCreate}
          onClose={() => toggle.create()}
          onFinish={onAddBasisPurpose}
          existingDataPurposeId={existingPurpose}
          activityId={activityId}
          current={current}
          setCurrent={(current) => setCurrent(current)}
          basisId={basisId}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            removeBasisPurpose.submit(
              toggle.data?.purposeID
            )
          }
          okButtonProps={{
            loading: removeBasisPurpose.isLoading,
          }}
        />
        <ActivityBasisPurposeModalEdit
          open={toggle.openEdit}
          onClose={() => toggle.edit()}
          purposeId={toggle.data?.purposeID}
          activityId={activityId}
          basisId={basisId}
        />
      </Card>
    </FallbackError>
  );
};
