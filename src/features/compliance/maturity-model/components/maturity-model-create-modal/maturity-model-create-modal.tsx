import { Form, Input } from 'antd';
import { useEffect } from 'react';

import { SelectOptionTypeData } from '@/features/shared';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

import { useCreateMaturityModel } from '../../api/create-maturity-model';

export type MaturityModelCreateModalProps = {
  open: boolean;
  onCancel?: () => void;
};

export const MaturityModelCreateModal = ({
  open,
  onCancel,
}: MaturityModelCreateModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const createMaturityModel = useCreateMaturityModel({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'สร้าง Maturity Model สำเร็จ',
      });
      onCancel?.();
    },
  });

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title="เพิ่ม Maturity Model"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okButtonProps={{
        loading: createMaturityModel.isLoading,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={createMaturityModel.submit}
      >
        <Form.Item
          name="name"
          label="ชื่อ Maturity Model"
          rules={[
            validation.required(
              'กรุณากรอกชื่อ Maturity Model'
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="modelType"
          label="กลุ่มโมเดล"
          rules={[
            validation.required('กรุณาเลือกกลุ่มโมเดล'),
          ]}
        >
          <SelectOptionTypeData type="MATURITY_MODEL" />
        </Form.Item>
        <Form.Item
          name="description"
          label="รายละเอียดเพิ่มเติม"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
