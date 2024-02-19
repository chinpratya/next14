import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useColumnAction,
  usePagination,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDisclosurePurposeDestinationPersonalProtectionMeasures } from '../../api/list-disclosure-purpose-destination-personal-protection-measures';
import { useRemoveDisclosurePurposeDestinationPersonalProtectionMeasures } from '../../api/remove-disclosure-purpose-destination-personal-protection-measures';
import { ActivityDestinationPersonalProtectionMeasures } from '../../types';

import { ActivityDisclosurePurposeDestinationMeasureAddModal } from './activity-disclosure-purpose-destination-measure-add-modal';
import { ActivityDisclosurePurposeDestinationMeasureModalDetail } from './activity-disclosure-purpose-destination-measure-modal-detail';

export type ActivityDisclosurePurposeDestinationMeasureProps =
  {
    activityId: string;
    purposeId: string;
    destinationId: string;
  };
export const ActivityDisclosurePurposeDestinationMeasure =
  ({
    activityId,
    purposeId,
    destinationId,
  }: ActivityDisclosurePurposeDestinationMeasureProps) => {
    const toggle = useToggle();
    const { showNotification } = useNotifications();
    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();
    const { data, isLoading, isError } =
      useListDisclosurePurposeDestinationPersonalProtectionMeasures(
        {
          activityId,
          purposeId,
          destinationId,
        }
      );
    const disbleMeasuresKey = data?.data.map(
      (v) => v.lawID
    );
    const removeMeasures =
      useRemoveDisclosurePurposeDestinationPersonalProtectionMeasures(
        {
          activityId,
          purposeId,
          destinationId,
          onSuccess: () => {
            showNotification({
              type: 'success',
              message: 'Delete Measure Success!',
            });
            toggle.remove();
          },
        }
      );
    const columnAction =
      useColumnAction<ActivityDestinationPersonalProtectionMeasures>(
        {
          usages: ['delete'],
          onAction: {
            delete: toggle.remove,
          },
        }
      );
    const columns: ColumnsType<ActivityDestinationPersonalProtectionMeasures> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.measure.name" />
          ),
          key: 'lawname',
          width: 250,
          ellipsis: true,
          render: (
            v: ActivityDestinationPersonalProtectionMeasures
          ) => (
            <Typography.Link
              onClick={() => toggle.preview(v)}
            >
              {v.lawname}
            </Typography.Link>
          ),
        },
        columnAction,
      ];

    return (
      <FallbackError isError={isError}>
        <Card
          title={
            <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.measure" />
          }
          extra={
            <Button
              onClick={() => toggle.create()}
              type="primary"
              icon={<PlusOutlined />}
            >
              เพิ่มมาตราการ
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={data?.data ?? []}
            pagination={false}
            loading={isLoading}
          />
          <Pagination
            total={10}
            current={page}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
          <DeleteModal
            open={toggle.openRemove}
            onCancel={() => toggle.remove()}
            identifier={toggle.data?.lawname}
            onDelete={() =>
              removeMeasures.submit(toggle.data?.lawID)
            }
            okButtonProps={{
              loading: removeMeasures.isLoading,
            }}
          />
          <ActivityDisclosurePurposeDestinationMeasureAddModal
            open={toggle.openCreate}
            onClose={() => toggle.create()}
            activityId={activityId}
            purposeId={purposeId}
            destinationId={destinationId}
            disbleMeasuresKey={
              disbleMeasuresKey as string[]
            }
          />
          <ActivityDisclosurePurposeDestinationMeasureModalDetail
            open={toggle.openPreview}
            onClose={() => toggle.preview()}
            lawId={toggle.data?.lawID}
          />
        </Card>
      </FallbackError>
    );
  };
