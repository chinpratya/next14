import { LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/stores/auth';
import validation from '@/utils/validation';

import { useLogin } from '../../api/login';
import { SignInSchema } from '../../schemas';
import {
  SignIn,
  SignInComponentProps,
} from '../../types';

import { LoginWrapper } from './login-wrapper';

export const LoginPassword = ({
  values,
  onPrev,
}: SignInComponentProps) => {
  const { authenticate } = useAuth();
  const { replace } = useRouter();

  const login = useLogin({
    onSuccess: (data) => {
      authenticate({
        ...data,
        email: values.username,
        role: undefined,
        access_role: 'apps',
      });
      replace(`/apps`, undefined, {
        shallow: true,
      });
    },
  });

  const onSignIn = (signIn: SignIn) =>
    login.submit(
      SignInSchema.parse({ ...values, ...signIn })
    );

  return (
    <LoginWrapper onPrev={onPrev}>
      <Form
        onFinish={onSignIn}
        layout="vertical"
        initialValues={values}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            validation.required('กรุณากรอกรหัสผ่าน'),
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            prefix={
              <LockOutlined className="text-primary" />
            }
          />
        </Form.Item>
        <Form.Item className="text-center mb-0">
          <Button
            id="login"
            type="primary"
            htmlType="submit"
            block
            loading={login.isLoading}
          >
            Continue
          </Button>
        </Form.Item>
        <Form.Item className="text-center">
          <Link href="/forgot-password">
            Forgot password?
          </Link>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};
