import { css } from '@emotion/css';
import { Typography, Descriptions, Button } from 'antd';
import { useRouter } from 'next/router';

import { AuthWrapper } from '@components/auth-wrapper';

import { SignupComponentProps } from '../../types/signup';

export const SignupCongratulations = ({
  values,
}: SignupComponentProps) => {
  const router = useRouter();

  const goLogin = () => {
    router.replace('/auth/login', undefined, {
      shallow: true,
    });
  };

  return (
    <AuthWrapper title="Congratulations!" help>
      <Descriptions
        layout="vertical"
        colon={false}
        column={1}
        className={css`
          th.d-label-none {
            display: none;
          }
        `}
      >
        <Descriptions.Item label="Name">
          <Typography.Title level={4}>
            {values.tenant.organization_name}
          </Typography.Title>
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          <Typography.Title level={4}>
            {
              values.tenant.organization_attributes
                .organization_short_name
            }
          </Typography.Title>
        </Descriptions.Item>
        <Descriptions.Item label="Your email">
          <Typography.Title level={4}>
            {values.user.email}
          </Typography.Title>
        </Descriptions.Item>
        <Descriptions.Item className="d-label-none">
          <Typography.Text>
            A verification email has been sent to you.
            Remember to check your spam folder if you
            don’t see it.
          </Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item className="d-label-none">
          <Typography.Text className="mb-2">
            <Button type="link" className="p-0">
              Click here (60s)
            </Button>{' '}
            if you did not receive an email or would like
            to change the email address you signed up
            with.
          </Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Your phone">
          <Typography.Title level={4}>
            {values.user.attributes.phone_number}
          </Typography.Title>
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" block onClick={goLogin}>
        Next
      </Button>
    </AuthWrapper>
  );
};
