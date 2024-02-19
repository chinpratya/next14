import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetActivityPurpose } from '../../api/get-activity-purpose';
import { ActivityPurposeDetail } from '../../types';

import { ActivityPurposeModalDetailExpand } from './activity-purpose-modal-detail-expand';

type ActivityPurposeModalDetailType = {
  open: boolean;
  onClose: () => void;
  purposeId: string;
};
export const ActivityPurposeModalDetail = ({
  open,
  onClose,
  purposeId,
}: ActivityPurposeModalDetailType) => {
  const router = useRouter();
  const activityId = router.query.activityId as string;
  const { data, isError, isLoading } =
    useGetActivityPurpose({
      activityId,
      purposeId,
    });

  const columns: ColumnsType<ActivityPurposeDetail> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: 'Data Classification',
      dataIndex: 'DataClassification',
      key: 'DataClassification',
      width: 150,
      render: (dataClassification: string[]) =>
        _.map(dataClassification, (v) => {
          return <Tag className="mx-1 my-1">{v}</Tag>;
        }),
    },
    {
      title: 'Organization',
      dataIndex: 'Organization',
      key: 'Organization',
      width: 150,
    },
  ];

  return (
    <Modal
      title="Purpose Detail"
      open={open}
      onCancel={() => onClose()}
      onOk={() => onClose()}
      width={850}
    >
      <FallbackError isError={isError}>
        <Table
          dataSource={data ?? []}
          columns={columns}
          tableLayout="fixed"
          scroll={{ x: 600 }}
          loading={isLoading}
          expandable={{
            expandedRowRender: (record) => (
              <ActivityPurposeModalDetailExpand
                dataCategoryID={record.dataCategoryID}
              />
            ),
          }}
        />
      </FallbackError>
    </Modal>
  );
};
