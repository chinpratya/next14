import {
  Card,
  Form,
  FormInstance,
  InputNumber,
  Switch,
} from 'antd';

import { DescriptionBlock } from '@components/description-block';

export type WebformVerificationProps = {
  form?: FormInstance;
};

export const WebformVerification = ({
  form,
}: WebformVerificationProps) => {
  return (
    <Card title="การตรวจสอบ">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isVerifyEmail: false,
        }}
      >
        <DescriptionBlock
          className="px-4"
          title="การยืนยันอีเมล"
          description="เจ้าของข้อมูลจำเป็นต้องยืนยันที่อยู่อีเมลเพื่อยืนยันคำขอ"
          extra={
            <Form.Item
              className="mb-0"
              name="isVerifyEmail"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
            </Form.Item>
          }
        />
        <DescriptionBlock
          className="px-4"
          title="คำขอหมดอายุ"
          description="กำหนดให้คำขอที่ไม่ได้รับการตรวจสอบหมดอายุหลังจากวันที่กำหนด"
          extra={
            <Form.Item className="mb-0" name="lifetime">
              <InputNumber min={0} />
            </Form.Item>
          }
          divider={false}
        />
      </Form>
    </Card>
  );
};
