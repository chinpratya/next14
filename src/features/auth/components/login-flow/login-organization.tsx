import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from 'antd';
import Link from 'next/link';

import validation from '@/utils/validation';

import { useGetLoginUrl } from '../../api/get-login-url';
import { SignInComponentProps } from '../../types';

import { LoginWrapper } from './login-wrapper';

export const LoginOrganization = ({
  values,
  onPrev,
}: SignInComponentProps) => {
  const [form] = Form.useForm();

  const { submit, isLoading } = useGetLoginUrl({
    onSuccess: (data) => {
      window.location.href = data;
    },
  });

  const handleSubmit = async () => {
    await form.validateFields();
    const organization = form.getFieldValue(
      'organization'
    ) as string;
    const username = values?.username as string;
    if (!username || !organization) {
      return;
    }
    submit({
      username,
      organization,
      redirect_uri: `${window.location.origin}/auth/login/${organization}`,
    });
  };

  return (
    <LoginWrapper onPrev={onPrev}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={values}
      >
        <Form.Item
          label="Organization Short name"
          name="organization"
          rules={[
            validation.required('กรุณากรอกชื่อองค์กร'),
          ]}
        >
          <Input placeholder="Enter Organization Short name" />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember on this device</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            id="organization"
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Continue
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="text-center">
            <Typography.Text className="text-center">
              <Link href={'/login'}>
                Email. me a list{' '}
              </Link>
              of my organizations or{' '}
            </Typography.Text>
            <br />
            <Link href={'contact'}>Contact Support</Link>
          </div>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
};
