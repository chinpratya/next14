import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { usePagination, useRowSelection } from '@/hooks';
import { Modal, ModalProps } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityDataProcessor } from '../../api/list-activity-data-processor';
import { ActivityDataProcessor } from '../../types';

export type ActivityActorPickerProps = ModalProps & {
  actorType?:
    | 'data-controller'
    | 'data-processor'
    | 'data-protection-officer'
    | 'receipt';
  onFinish?: (actors: ActivityDataProcessor[]) => void;
  disabledRowKeys?: string[];
};

const ACTOR_TYPE_LABELS = {
  'data-controller': (
    <IntlMessage id="dataMapping.activity.activityDetail.addDataController" />
  ),
  'data-processor': (
    <IntlMessage id="dataMapping.activity.activityDetail.addDataProcessor" />
  ),
  'data-protection-officer': (
    <IntlMessage id="dataMapping.activity.activityDetail.addDataProtectionOfficer" />
  ),
  receipt: (
    <IntlMessage id="dataMapping.activity.activityDetail.addReceipt" />
  ),
};

export const ActivityActorPicker = ({
  actorType = 'data-controller',
  disabledRowKeys = [],
  onFinish,
  ...modalProps
}: ActivityActorPickerProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      disabledRowKeys,
      type: 'radio',
    });

  const { data, isLoading, isError } =
    useListActivityDataProcessor({
      position: actorType,
      page,
      pageSize,
    });

  const columns: ColumnsType<ActivityDataProcessor> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.personalType" />
      ),
      dataIndex: 'personalType',
      key: 'personalType',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.organization" />
      ),
      dataIndex: 'organizationName',
      key: 'organizationName',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.actor.organizationType" />
      ),
      dataIndex: 'organizationType',
      key: 'organizationType',
      width: 150,
    },
  ];

  const handleOk = () => {
    const selectedRows = rowSelection.selectedRowKeys.map(
      (key) =>
        data?.data?.find(
          (dataSource) =>
            dataSource.dataProcessorID === key
        )
    );

    selectedRows?.filter(Boolean);
    onFinish?.(selectedRows as ActivityDataProcessor[]);
  };

  return (
    <Modal
      {...modalProps}
      title={ACTOR_TYPE_LABELS[actorType]}
      afterClose={resetSelectedRowKeys}
      onOk={handleOk}
      width={1000}
    >
      <FallbackError isError={isError}>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          rowKey="dataProcessorID"
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 750 }}
          rowSelection={rowSelection}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
