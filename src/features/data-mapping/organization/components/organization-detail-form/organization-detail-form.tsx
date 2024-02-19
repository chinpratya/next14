import { Form, Input, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

export type OrganizationDetailFormProps = {
  form: FormInstance;
};

export const OrganizationDetailForm = ({
  form,
}: OrganizationDetailFormProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dataMapping.organization.organizationID" />
          }
          name="entitySubID"
          rules={[
            validation.required(
              t(
                'dataMapping.organization.organizationIDRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.organization.abbreviation" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.organization.abbreviationRequired'
              )
            ),
          ]}
          name="shortName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.organization.nameOrg" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'dataMapping.organization.nameOrgRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.organization.description" />
          }
          name="note"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </div>
  );
};
