import { Card, Form } from 'antd';
import { t } from 'i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteScheduler } from '../../api/delete-scheduler';
import { useListScheduler } from '../../api/list-scheduler';
import { useUpdateScheduler } from '../../api/update-scheduler';
import { ReportScheduler } from '../../types';
import { ReportSchedulersSettingModal } from '../report-schedulers-setting-modal';

import { ReportSchedulerTable } from './report-scheduler-table';

export const ReportSchedulerList = () => {
  const [form] = Form.useForm();
  const toggle = useToggle<ReportScheduler>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } = useListScheduler({
    page,
    pageSize,
  });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const updateScheduler = useUpdateScheduler({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      toggle.edit();
    },
  });

  const deleteScheduler = useDeleteScheduler({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.deleted'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onUpdateScheduler = () => {
    const values = form.getFieldsValue();
    updateScheduler.submit({
      ...values,
      _id: toggle.data._id,
      filter: toggle.data.filter,
    });
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.report.scheduler.list" />
        }
      >
        <ReportSchedulerTable
          loading={isLoading}
          dataSource={data?.data ?? []}
          onEdit={toggle.edit}
          onDelete={toggle.remove}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>

      <DeleteModal
        open={toggle.openRemove}
        loading={deleteScheduler.isLoading}
        identifier={toggle.data?.name as string}
        data={toggle.data}
        onDelete={(scheduler) =>
          deleteScheduler.submit(scheduler?._id as string)
        }
        onCancel={() => toggle.remove()}
      />

      <ReportSchedulersSettingModal
        isEditor
        data={toggle.data}
        form={form}
        open={toggle.openEdit}
        onCancel={toggle.edit}
        onSubmit={onUpdateScheduler}
      />
    </FallbackError>
  );
};
