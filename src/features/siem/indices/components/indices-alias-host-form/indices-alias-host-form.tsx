import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

type IndicesAliasHostFormProps = {
  form: FormInstance;
  isEditor?: boolean;
};

export const IndicesAliasHostForm = ({
  form,
  isEditor,
}: IndicesAliasHostFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="hostname"
        label={
          <IntlMessage id="logManagement.hostname" />
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
              field: t('logManagement.hostname'),
            }) as string
          }
          disabled={isEditor}
        />
      </Form.Item>
      <Form.Item
        name="alias_name"
        label={
          <IntlMessage id="logManagement.indices.host.aliasHost" />
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
              field: t(
                'logManagement.indices.host.aliasHost'
              ),
            }) as string
          }
        />
      </Form.Item>
    </Form>
  );
};
