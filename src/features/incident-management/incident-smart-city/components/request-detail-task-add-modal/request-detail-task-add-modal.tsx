import { Form, Tabs } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useAddRequestTask } from '../../api/add-request-task';
import { RequestDetailTaskBasicInfo } from '../request-detail-task-basic-info';
import { RequestDetailTaskNotification } from '../request-detail-task-notification';

type RequestDetailTaskAddModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
  stateId: string;
};

export const RequestDetailTaskAddModal = ({
  open,
  onCancel,
  requestId,
  stateId,
}: RequestDetailTaskAddModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const addTask = useAddRequestTask({
    requestId,
    stateId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Add task successfully.',
      });
      form.resetFields();
      onCancel();
    },
  });

  const handlerAddTask = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    addTask.submit(values);
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title="เพิ่ม/แก้ไขงาน"
      open={open}
      onCancel={onCancel}
      onOk={handlerAddTask}
      okButtonProps={{ loading: addTask.isLoading }}
    >
      <Tabs
        items={[
          {
            label: 'ข้อมูลทั่วไป',
            key: 'basic-info',
            children: (
              <RequestDetailTaskBasicInfo form={form} />
            ),
          },
          {
            label: 'การแจ้งเตือนงาน',
            key: 'notification',
            children: (
              <RequestDetailTaskNotification
                form={form}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
