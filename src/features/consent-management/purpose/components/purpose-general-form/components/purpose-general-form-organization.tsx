import { Card, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationPicker } from '../../../../../admin';

type PurposeGeneralFormOrganizationProps = {
  form: FormInstance;
};

export const PurposeGeneralFormOrganization = ({
  form,
}: PurposeGeneralFormOrganizationProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.basicInfo.organization" />
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.basicInfo.organization" />
          }
          name="organizationID"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.basicInfo.organizationRequired'
              )
            ),
          ]}
        >
          <OrganizationPicker />
        </Form.Item>
      </Form>
    </Card>
  );
};
