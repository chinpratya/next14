import { Card, Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

export type IncidentTemplateInfoProps = {
  form?: FormInstance;
};

export const IncidentTemplateInfo = ({
  form,
}: IncidentTemplateInfoProps) => {
  const { t } = useTranslation();

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:update'
      ],
    ],
  });

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.general}
        />
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: '',
          description: '',
        }}
        disabled={!editPermission.isAllow}
      >
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={tokens.dataBreach.incidentTemplate.name}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.dataBreach.incidentTemplate
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <IntlMessage
              id={
                tokens.dataBreach.incidentTemplate
                  .description
              }
            />
          }
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  );
};
