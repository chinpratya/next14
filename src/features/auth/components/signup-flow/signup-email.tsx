import { MailOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from 'antd';
import Link from 'next/link';

import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { SignupComponentProps } from '../../types/signup';

export const SignupEmail = ({
  values,
  onNext,
}: SignupComponentProps) => {
  return (
    <AuthWrapper
      title="First, enter your email"
      description="We recommend using your work email address."
      extra={
        <Typography.Text type="secondary">
          มีบัญชีอยู่แล้ว? กรุณา
          <Link href="/auth/login">ลงชื่อเข้าใช้</Link>
        </Typography.Text>
      }
    >
      <Form
        layout="vertical"
        initialValues={values}
        onFinish={onNext}
      >
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[validation.required('อีเมล')]}
          className="mb-2"
        >
          <Input
            prefix={
              <MailOutlined className="text-primary" />
            }
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="accept"
          valuePropName="checked"
          rules={[validation.required('ยอมรับเงื่อนไข')]}
        >
          <Checkbox>
            <Typography.Text>
              ฉันยอมรับ
              <Link href="/terms">เงื่อนไขการใช้งาน</Link>
              และ
              <Link href="/privacy">
                นโยบายความเป็นส่วนตัว
              </Link>
            </Typography.Text>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
