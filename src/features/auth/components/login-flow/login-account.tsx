import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import validation from '@/utils/validation';

import { SignInComponentProps } from '../../types';

import { LoginWrapper } from './login-wrapper';

export const LoginAccount = ({
  values,
  onNext,
}: SignInComponentProps) => {
  return (
    <LoginWrapper>
      <Form
        layout="vertical"
        initialValues={values}
        onFinish={onNext}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            validation.required(`กรุณากรอกอีเมล`),
            validation.email(),
          ]}
        >
          <Input
            name="email"
            prefix={
              <MailOutlined className="text-primary" />
            }
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            id="email"
            type="primary"
            htmlType="submit"
            block
            className="mt-4"
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};
