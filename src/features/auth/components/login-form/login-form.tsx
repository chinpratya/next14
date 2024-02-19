import {
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '@/stores/auth';

import { useLogin } from '../../api/login';

export type LoginFormProps = {
  extra?: React.ReactNode | string;
};

export const LoginForm = ({ extra }: LoginFormProps) => {
  const { authenticate } = useAuth();
  const { replace } = useRouter();

  const login = useLogin({
    onSuccess: (data) => {
      authenticate(data);
      replace(`/apps`, undefined, {
        shallow: true,
      });
    },
  });

  return (
    <>
      <Form
        layout="vertical"
        name="login-form"
        onFinish={login.submit}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Please enter a validate email!',
            },
          ]}
        >
          <Input
            prefix={
              <MailOutlined className="text-primary" />
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined className="text-primary" />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={login.isLoading}
            type="primary"
            htmlType="submit"
            block
          >
            Sign In
          </Button>
        </Form.Item>
        {extra}
      </Form>
    </>
  );
};
