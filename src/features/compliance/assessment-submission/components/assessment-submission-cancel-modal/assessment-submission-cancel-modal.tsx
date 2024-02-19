import { Form, Input } from 'antd';

import validation from '@/utils/validation';
import { Modal } from '@components/modal';

export type AssessmentSubmissionCancelModalProps = {
  assessmentId: string;
  open: boolean;
  onCancel: () => void;
};

export const AssessmentSubmissionCancelModal = ({
  assessmentId,
  open,
  onCancel,
}: AssessmentSubmissionCancelModalProps) => {
  const [form] = Form.useForm();

  const onCancelAssessment = async () => {
    await form.validateFields();
    const reason = form.getFieldValue('reason');
    console.log('extendDt', reason, assessmentId);
  };
  return (
    <Modal
      title="ยกเลิกผู้ทำแบบประเมิน"
      //   isError={isError}
      //   loading={isLoading}
      open={open}
      onCancel={onCancel}
      width={750}
      okText="บันทึก"
      //   okButtonProps={{
      //     loading: extendTime.isLoading,
      //   }}
      onOk={onCancelAssessment}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="reason"
          label="เหตุผล"
          rules={[validation.required('กรุณากรอกเหตุผล')]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
