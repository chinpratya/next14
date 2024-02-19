import { Form, Input } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useRejectRequest } from '../../api/reject-request';

type RequestRejectModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
};

export const RequestRejectModal = ({
  open,
  onCancel,
  requestId,
}: RequestRejectModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useRejectRequest({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'reject request successfully.',
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
      title="ปฏิเสธคำขอ"
      open={open}
      onCancel={onCancel}
      okText="ปฏิเสธ"
      onOk={() => form.submit()}
      okButtonProps={{
        danger: true,
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
        {/* <Form.Item label="กฎหมายที่เกี่ยวข้อง" name="">
          <Select
            options={[]}
            placeholder="เลือกกฎหมายที่เกี่ยวข้อง"
          />
        </Form.Item>
        <Form.Item label="คำตอบ" name="">
          <Select options={[]} placeholder="เลือกคำตอบ" />
        </Form.Item>
        <Form.Item name="">
          <Input.TextArea
            rows={5}
            placeholder="ใส่เหตุผลในการปฏิเสธคำขอที่นี่"
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
