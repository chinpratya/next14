import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';

import { useListUser } from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useUpdateRequestAssign } from '../../api/update-request-assign';

type RequestBasicInfoManageAssignModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
};

export const RequestBasicInfoManageAssignModal = ({
  open,
  onCancel,
  requestId,
}: RequestBasicInfoManageAssignModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const { data } = useListUser({});
  const options = data?.data.map((v) => {
    return {
      label: v.email,
      value: v.userId,
    };
  });
  console.log('user', options);

  const updateAssign = useUpdateRequestAssign({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update assign success',
      });
      onCancel();
    },
  });

  const handlerUpdateAssign = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateAssign.submit(values);
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title="มอบหมายคำขอ"
      open={open}
      onCancel={onCancel}
      okText="มอบหมาย"
      onOk={handlerUpdateAssign}
      okButtonProps={{
        loading: updateAssign.isLoading,
      }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="ผู้อนุมัติ" name="approveID">
          <Select options={options} />
        </Form.Item>
        <Form.Item label="แสดงความคิดเห็น" name="comment">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
