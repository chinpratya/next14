import { Form, FormInstance } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

import { RECAPTCHA_SITE_KEY } from '@/config/constants';

export type ConsentRecapchaProps = {
  form: FormInstance;
};
export const ConsentRecapcha = ({
  form,
}: ConsentRecapchaProps) => {
  return (
    <Form form={form}>
      <Form.Item
        name="recaptcha"
        rules={[
          {
            required: true,
            message:
              'Please confirm you are not a robot!',
          },
        ]}
      >
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} />
      </Form.Item>
    </Form>
  );
};
