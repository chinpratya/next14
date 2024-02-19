import { Col, DatePicker, Form, Input, Row } from 'antd';
// import { useEffect } from 'react';

// import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

const { RangePicker } = DatePicker;

export type AssessmentSubmissionExtendTimeModalProps = {
  assessmentId: string;
  open: boolean;
  onCancel: () => void;
};

export const AssessmentSubmissionExtendTimeModal = ({
  assessmentId,
  open,
  onCancel,
}: AssessmentSubmissionExtendTimeModalProps) => {
  const [form] = Form.useForm();

  const onExtendTime = async () => {
    await form.validateFields();
    const values = {
      extendDt: {
        start: form
          .getFieldValue('extendDt')[0]
          .format('YYYY-MM-DD HH:mm:ss'),
        end: form
          .getFieldValue('extendDt')[1]
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      reason: form.getFieldValue('reason'),
    };
    console.log('extendDt', values, assessmentId);
  };

  return (
    <Modal
      title="ขยายระยะเวลา"
      //   isError={isError}
      //   loading={isLoading}
      open={open}
      onCancel={onCancel}
      width={750}
      okText="บันทึก"
      //   okButtonProps={{
      //     loading: extendTime.isLoading,
      //   }}
      onOk={onExtendTime}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="กำหนดช่วงระยะเวลาการขยายเวลาการทำการประเมิน"
          required
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="extendDt"
                rules={[
                  validation.required('Extend Date'),
                ]}
              >
                <RangePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="reason"
          label="เหตุผล"
          rules={[validation.required('Reason')]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
