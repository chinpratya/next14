import { Form, Input } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useCloseRequest } from '../../api/close-request';

type RequestCloseModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
};

export const RequestCloseModal = ({
  open,
  onCancel,
  requestId,
}: RequestCloseModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCloseRequest({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'close request successfully.',
      });
      onCancel();
    },
  });

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title="ปิดคำขอ"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okButtonProps={{
        loading: isLoading,
      }}
      centered
    >
      <Form
        form={form}
        onFinish={(values) => submit(values)}
        layout="vertical"
      >
        <Form.Item label="ข้อความ" name="massage">
          <Input.TextArea rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
