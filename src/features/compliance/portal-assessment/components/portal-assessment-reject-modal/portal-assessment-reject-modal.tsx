import { Form, Input } from 'antd';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

import { useRejectPortalAssessment } from '../../api/reject-portal-assessment';

export type PortalAssessmentRejectModalProps = {
  assessmentId: string;
  open: boolean;
  onCancel: () => void;
};

export const PortalAssessmentRejectModal = ({
  assessmentId,
  open,
  onCancel,
}: PortalAssessmentRejectModalProps) => {
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const { submit, isLoading } = useRejectPortalAssessment(
    {
      assessmentId,
      onSuccess: () => {
        onCancel();
        showNotification({
          type: 'success',
          message: 'ปฏิเสธคำขอเรียบร้อยแล้ว',
        });
      },
    }
  );

  return (
    <Modal
      title="ปฏิเสธ"
      open={open}
      onCancel={onCancel}
      centered
      onOk={() => form.submit()}
      okText="ปฏิเสธ"
      okButtonProps={{
        danger: true,
        loading: isLoading,
      }}
      width={600}
    >
      <Form
        form={form}
        onFinish={(values) => submit(values)}
        layout="vertical"
      >
        <Form.Item
          name="reason"
          label="กรุณากรอกเหตุผลในการปฏิเสธ"
          rules={[validation.required('reason')]}
        >
          <Input.TextArea
            rows={5}
            placeholder="ใส่เหตุผลในการปฏิเสธคำขอนี้"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
