import { Typography, Form, Input, Button } from 'antd';

import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { SignupComponentProps } from '../../types/signup';

export const SignupSlug = ({
  values,
  onNext,
  onPrev,
}: SignupComponentProps) => {
  return (
    <AuthWrapper
      title={`Create you Organization’s short name for ${values?.tenant.organization_name}`}
      description="This will be the name you will use to log in."
      extra={
        <Typography.Text type="secondary">
          Pick something easy to type and easy to
          remember.
        </Typography.Text>
      }
      onPrev={onPrev}
    >
      <Form
        layout="vertical"
        initialValues={values}
        onFinish={onNext}
      >
        <Form.Item
          name={[
            'tenant',
            'organization_attributes',
            'organization_short_name',
          ]}
          label="Organization Short Name"
          rules={[
            validation.required(
              'Organization Short Name'
            ),
            validation.maxLength(
              'Organization Short Name',
              10
            ),
          ]}
        >
          <Input placeholder="Organization Short Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Next
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
