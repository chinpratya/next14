import { css } from '@emotion/css';
import { useInterval } from '@mantine/hooks';
import { Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useAuth } from '@/stores/auth';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { AuthWrapper } from '@components/auth-wrapper';

import { useLogin } from '../../api/login';
import { useVerify } from '../../api/verify';
import {
  VerificationOtp,
  VerifyProps,
  VerificationEmail,
} from '../../types/verify';

export const VerifyOtp = ({
  form,
  onPrev,
  verify,
}: VerifyProps) => {
  const router = useRouter();
  const { authenticate } = useAuth();
  const { showNotification } = useNotifications();
  const [seconds, setSeconds] = useState(60);
  const [Code, setCode] = useState('');
  const interval = useInterval(
    () => setSeconds((s) => s - 1),
    1000
  );
  const onSuccessResendOTP = (
    verificationEmail: VerificationEmail
  ) => {
    showNotification({
      type: 'success',
      message: 'ส่งรหัส OTP อีกครั้งเรียบร้อย',
    });
    setCode(verificationEmail.code);
  };
  useEffect(() => {
    if (seconds === 0) {
      interval.stop();
      setSeconds(60);
    }
  }, [seconds, interval]);

  const resendOtp = useLogin({
    onSuccess: onSuccessResendOTP,
  });
  const onSuccess = (
    verificationOtp: VerificationOtp
  ) => {
    authenticate({
      access_token: verificationOtp.AccessToken,
      refresh_token: verificationOtp.RefreshToken,
      expires_in: verificationOtp.AccessTokenExpiresIn,
      refresh_expires_in:
        verificationOtp.RefreshTokenExpiresIn,
      access_role: 'portal',
      role: verificationOtp.role,
      email: verify?.email,
    });
    router.replace(
      `/portal/assessment-automation/${verificationOtp.role}`
    );
  };

  const onError = () => {
    showNotification({
      type: 'error',
      message: 'รหัส OTP ไม่ถูกต้อง',
    });
  };

  const verifyOtp = useVerify({
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <AuthWrapper
      title="Log in"
      description="ยืนยันรหัส OTP เพื่อเข้าสู่ระบบ"
      onPrev={onPrev}
      src="/img/logo-hits.png"
      width={80}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ otp }) =>
          verifyOtp.submit({
            otp,
            code: Code !== '' ? Code : verify?.code,
          })
        }
      >
        <Form.Item
          name="otp"
          label="OTP"
          rules={[
            validation.required('OTP'),
            // validation.number('OTP'),
          ]}
          className="mb-0"
        >
          <Input placeholder="ระบุหมายเลข OTP" />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="link"
            className={css`
              color: ${interval.active
                ? '#ffff'
                : '#3E79F7'};
              padding: 0;
            `}
            onClick={() => {
              interval.start();
              resendOtp.submit(verify?.email);
            }}
            disabled={interval.active ? true : false}
          >
            ส่งรหัส OTP อีกครั้ง{' '}
          </Button>
          {interval.active && (
            <Typography.Text
              type="secondary"
              className="pl-1"
            >
              ({seconds} วินาที)
            </Typography.Text>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={verifyOtp.isLoading}
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
