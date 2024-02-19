import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

import { useCreateAssessmentInventory } from '../../api/create-assessment-inventory';

const { TextArea } = Input;

type CreateAssessmentInventoryModalProps = {
  open: boolean;
  toggleModal: () => void;
};

export const CreateAssessmentInventoryModal = ({
  open,
  toggleModal,
}: CreateAssessmentInventoryModalProps) => {
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'สร้างแบบประเมินสำเร็จแล้ว',
    });
    toggleModal();
    form.resetFields();
  };

  const { submit, isLoading } =
    useCreateAssessmentInventory({
      onSuccess,
    });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      open={open}
      title="เพิ่มแบบประเมิน"
      onOk={() => form.submit()}
      onCancel={() => toggleModal()}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          label="ชื่อแบบประเมิน"
          name="name"
          rules={[validation.required('ชื่อแบบประเมิน')]}
        >
          <Input placeholder="ชื่อแบบประเมิน" />
        </Form.Item>
        <Form.Item
          label="กลุ่มแบบประเมิน"
          name="group"
          rules={[validation.required('ประภทแบบประเมิน')]}
        >
          <Select
            mode="tags"
            placeholder="ประเภทแบบประเมิน"
          />
        </Form.Item>
        <Form.Item
          label="รายละเอียดเพิ่มเติม"
          name="description"
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
