import { Card, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

export const IndicesInfoDataGeneral = () => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="logManagement.indices.dataGeneral" />
      }
    >
      <Form.Item
        name="name"
        label={
          <IntlMessage id="logManagement.indices.name" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.indices.name'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name="alias_name"
        label={
          <IntlMessage id="logManagement.indices.aliasName" />
        }
        rules={[
          validation.required('Alias Name'),
          validation.minLength('alias  name', 5),
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="description"
        label={
          <IntlMessage id="logManagement.indices.description" />
        }
      >
        <Input.TextArea
          rows={5}
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.indices.description'
              ),
            }) as string
          }
        />
      </Form.Item>
    </Card>
  );
};
