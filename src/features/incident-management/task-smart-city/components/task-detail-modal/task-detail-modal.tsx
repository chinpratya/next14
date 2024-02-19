import { css } from '@emotion/css';
import { Form, Skeleton, Tabs } from 'antd';
import { useEffect } from 'react';

import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetTask } from '../../api/get-task';
import { TaskDetailChangeStatus } from '../task-detail-change-status';
import { TaskDetailHistory } from '../task-detail-history';
import { TaskDetailNotification } from '../task-detail-notification';
import { TaskDetailOverview } from '../task-detail-overview';
import { TaskDetailRequestDetail } from '../task-detail-request-detail';

type TaskDetailModalProps = {
  open: boolean;
  onCancel: () => void;
  workId: string;
};

export const TaskDetailModal = ({
  open,
  onCancel,
  workId,
}: TaskDetailModalProps) => {
  const [form] = Form.useForm();

  const { data, isError, isLoading } = useGetTask(workId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    return () => {
      form.resetFields();
    };
  }, [form, data]);

  return (
    <Modal
      title={
        <>
          รายละเอียดงาน
          <span
            className={css`
              color: #72849a;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
              margin-right: 10px;
            `}
          >
            {data?.workName}
          </span>
        </>
      }
      open={open}
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Tabs
            items={[
              {
                key: 'overview',
                label: 'ภาพรวม',
                children: (
                  <TaskDetailOverview
                    form={form}
                    taskId={workId}
                  />
                ),
              },
              {
                key: 'notification',
                label: 'การแจ้งเตือน',
                children: (
                  <TaskDetailNotification form={form} />
                ),
              },
              {
                key: 'request-detail',
                label: 'รายละเอียดคำขอ',
                children: (
                  <TaskDetailRequestDetail
                    data={data}
                    taskId={workId}
                  />
                ),
              },
              {
                key: 'change-status',
                label: 'เปลี่ยนสถานะ',
                children: (
                  <TaskDetailChangeStatus
                    workId={workId}
                    data={data}
                    onClose={onCancel}
                  />
                ),
              },
              {
                key: 'history',
                label: 'ประวัติการทำงาน',
                children: (
                  <TaskDetailHistory workId={workId} />
                ),
              },
            ]}
          />
        )}
      </FallbackError>
    </Modal>
  );
};
