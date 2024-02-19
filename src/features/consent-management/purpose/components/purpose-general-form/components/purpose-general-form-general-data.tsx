import { Card, Form, Input, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PurposeGeneralFormGeneralDataProps = {
  form: FormInstance;
};

export const PurposeGeneralFormGeneralData = ({
  form,
}: PurposeGeneralFormGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.basicInfo.generalData" />
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          description: '',
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.basicInfo.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.basicInfo.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.basicInfo.description" />
          }
          name="description"
        >
          <Input.TextArea rows={6} />
        </Form.Item>
      </Form>
    </Card>
  );
};
