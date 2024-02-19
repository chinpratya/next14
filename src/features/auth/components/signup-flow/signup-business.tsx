import {
  Form,
  Typography,
  Input,
  Select,
  Button,
} from 'antd';

import utils from '@/utils';
import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { useGetSignupMeta } from '../../api/get-signup-meta';
import { SignupComponentProps } from '../../types/signup';

export const SignupBusiness = ({
  values,
  onNext,
  onPrev,
}: SignupComponentProps) => {
  const { data, isLoading, isError } = useGetSignupMeta();

  return (
    <AuthWrapper
      title="Create you Organization in One Fence"
      description="Enter a name for your organization within One Fence"
      extra={
        <Typography.Text type="secondary">
          Your Company’s name is a good choice.
        </Typography.Text>
      }
      onPrev={onPrev}
      loading={isLoading}
      isError={isError}
    >
      <Form
        layout="vertical"
        initialValues={values}
        onFinish={onNext}
      >
        <Form.Item
          label="Organization Name"
          name={['tenant', 'organization_name']}
          rules={[
            validation.required('Organization Name '),
          ]}
        >
          <Input placeholder="Organization name" />
        </Form.Item>
        <Form.Item
          label="ประเภทธุรกิจ"
          name={[
            'tenant',
            'organization_attributes',
            'organization_type',
          ]}
          rules={[validation.required('ประเภทธุรกิจ')]}
        >
          <Select
            options={utils.convertArrayToOptions(
              data?.organizationType
            )}
            placeholder="เลือกประเภทธุรกิจ"
          />
        </Form.Item>
        <Form.Item
          label="จำนวนพนักงาน"
          name={[
            'tenant',
            'organization_attributes',
            'organization_employee_size',
          ]}
          rules={[validation.required('จำนวนพนักงาน')]}
        >
          <Select
            options={utils.convertArrayToOptions(
              data?.organizationEmployeeSize
            )}
            placeholder="เลือกจำนวนพนักงาน"
          />
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
