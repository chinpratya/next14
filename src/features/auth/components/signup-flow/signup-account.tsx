import { Form, Button, Input } from 'antd';

import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { useSignup } from '../../api/signup';
import { SignupSchema } from '../../schemas';
import {
  Signup,
  SignupComponentProps,
} from '../../types/signup';

export const SignupAccount = ({
  values,
  onPrev,
  onNext,
}: SignupComponentProps) => {
  const signup = useSignup({
    onSuccess: async (signup) => {
      onNext?.(signup);
    },
  });
  const onFinish = (account: Signup) => {
    const data = { ...values };
    data.user.attributes = {
      ...data.user.attributes,
      ...account.user.attributes,
    };
    data.user = {
      ...data.user,
      ...account.user,
    };
    const payload = SignupSchema.parse(data);
    signup.submit(payload);
  };

  return (
    <AuthWrapper
      title={`Let’s finish your account for ${values.tenant.organization_name}`}
      description={`${values.user.email}`}
      onPrev={onPrev}
    >
      <Form
        layout="vertical"
        initialValues={values}
        onFinish={onFinish}
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          label="First Name"
          name={['user', 'attributes', 'first_name']}
          rules={[validation.required('First Name')]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={['user', 'attributes', 'last_name']}
          rules={[validation.required('Last Name')]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name={['user', 'attributes', 'phone_number']}
          rules={[
            validation.required('Phone'),
            validation.phone('phone'),
          ]}
        >
          <Input placeholder="+66" />
        </Form.Item>
        <Form.Item
          label="Create Password"
          name={['user', 'password']}
          rules={[
            validation.required('password'),
            validation.password8('password'),
            validation.special('password'),
            validation.oneLetter('password'),
            validation.oneNumber('password'),
            validation.oneUppercase('password'),
            validation.oneLowercase('password'),
          ]}
        >
          <Input.Password placeholder="Create Password" />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prev, next) =>
            prev.user.password !== next.user.password
          }
        >
          {({ getFieldValue }) => (
            <Form.Item
              label="Confirm Password"
              name={['user', 'confirmPassword']}
              rules={[
                validation.required('Confirm Password'),
                {
                  validator: (rule, value) => {
                    if (
                      value !==
                      getFieldValue(['user', 'password'])
                    ) {
                      return Promise.reject(
                        'Password does not match'
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={signup.isLoading}
            type="primary"
            htmlType="submit"
            block
          >
            Done
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
