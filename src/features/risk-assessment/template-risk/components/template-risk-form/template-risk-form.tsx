import { Form, FormInstance, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetMetaTemplateRisk } from '../../api/get-meta-template-risk';

export type TemplateRiskFormProps = {
  form: FormInstance;
};

export const TemplateRiskForm = ({
  form,
}: TemplateRiskFormProps) => {
  const { t } = useTranslation();
  const { data } = useGetMetaTemplateRisk();

  const options = data?.type?.map((value) => {
    return {
      label: value.name,
      value: value.ObjectUUID,
    };
  });

  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskTemplate.name}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskTemplate.type}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .typeRequired
              )
            ),
          ]}
        >
          <Select options={options} />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate.details
              }
            />
          }
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </>
  );
};
