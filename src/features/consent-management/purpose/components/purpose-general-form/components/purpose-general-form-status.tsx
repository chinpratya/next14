import { Card, Form, Select, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PurposeGeneralFormStatusProps = {
  form: FormInstance;
};

export const PurposeGeneralFormStatus = ({
  form,
}: PurposeGeneralFormStatusProps) => {
  const { t } = useTranslation();

  const options = [
    {
      label: (
        <IntlMessage id={tokens.common.status.active} />
      ),
      value: 'active',
    },
    {
      label: (
        <IntlMessage id={tokens.common.status.inactive} />
      ),
      value: 'inactive',
    },
  ];

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.basicInfo.status" />
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.basicInfo.status" />
          }
          name="status"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.basicInfo.statusRequired'
              )
            ),
          ]}
        >
          <Select options={options} disabled />
        </Form.Item>
      </Form>
    </Card>
  );
};
