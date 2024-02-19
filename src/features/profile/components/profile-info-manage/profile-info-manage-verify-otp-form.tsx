import {
  Button,
  Form,
  FormInstance,
  Input,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type ProfileInfoManageVerifyOtpFormProps = {
  form: FormInstance;
};

export const ProfileInfoManageVerifyOtpForm = ({
  form,
}: ProfileInfoManageVerifyOtpFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="profile.setting.basicInfo.otp" />
        }
        className="mb-0"
        name="otp"
        rules={[
          validation.required(
            t('profile.setting.basicInfo.otpRequired')
          ),
          validation.number('OTP'),
        ]}
      >
        <Input
          placeholder={
            t(
              'profile.setting.basicInfo.otpPlaceholder'
            ) as string
          }
        />
      </Form.Item>
      <Form.Item className="mb-0">
        <Button type="link" className="text-dark p-0">
          <IntlMessage id="profile.setting.basicInfo.otp.resent" />
        </Button>
        <Typography.Text
          type="secondary"
          className="pl-1"
        >
          (59 วินาที)
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};
