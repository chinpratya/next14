import { MailOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from 'antd';
import Link from 'next/link';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { useLogin } from '../../api/login';
import {
  VerificationEmail,
  VerifyProps,
} from '../../types/verify';

export const VerifyEmail = ({
  form,
  verify,
  onNext,
}: VerifyProps) => {
  const { showNotification } = useNotifications();

  const onSuccess = (
    verificationEmail: VerificationEmail
  ) => {
    onNext({
      ...verify,
      ...verificationEmail,
      email: form.getFieldValue('email'),
    });
  };

  const onError = () => {
    showNotification({
      type: 'error',
      message: 'ไม่มี Email นี้อยู่ในระบบ',
    });
  };

  const login = useLogin({
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <AuthWrapper
      title="Log in"
      description="Please enter your email address to log in"
      src="/img/logo-hits.png"
      width={80}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={verify}
        onFinish={({ email }) => login.submit(email)}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            validation.required(
              'กรุณากรอกอีเมลให้ถูกต้อง'
            ),
            validation.email(),
          ]}
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
          rules={[
            validation.required(
              'กรุณายอมรับเงื่อนไขการใช้งาน'
            ),
          ]}
        >
          <Checkbox>
            <Typography.Text>
              ฉันยอมรับ
              <Link href="/terms" target="_blank">
                เงื่อนไขการใช้งาน
              </Link>
              และ
              <Link href="/privacy" target="_blank">
                นโยบายความเป็นส่วนตัว
              </Link>
            </Typography.Text>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            loading={login.isLoading}
            type="primary"
            htmlType="submit"
            block
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
