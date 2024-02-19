import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export const TagInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={
          <IntlMessage id="dsarAutomation.tags.name" />
        }
        name="name"
        rules={[
          validation.required(
            t('dsarAutomation.tags.nameRequire')
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="dsarAutomation.tags.organization" />
        }
        name="organization"
      >
        <Input disabled />
      </Form.Item>
    </>
  );
};
