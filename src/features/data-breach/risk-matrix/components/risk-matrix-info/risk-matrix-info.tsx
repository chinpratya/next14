import { Card, Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

export type RiskMatrixInfo = {
  form?: FormInstance;
};

export const RiskMatrixInfo = ({
  form,
}: RiskMatrixInfo) => {
  const { t } = useTranslation();
  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });
  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.general}
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
              id={tokens.dataBreach.riskMatrix.name}
            />
          }
          rules={[
            validation.required(
              t(tokens.dataBreach.riskMatrix.nameRequired)
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
                tokens.dataBreach.riskMatrix.description
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
