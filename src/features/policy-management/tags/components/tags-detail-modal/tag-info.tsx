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
          <IntlMessage id="policyManagement.tag.name" />
        }
        name="name"
        rules={[
          validation.required(
            t('policyManagement.tag.nameRequired')
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="policyManagement.tag.organization" />
        }
        name="organization"
      >
        <Input disabled />
      </Form.Item>
    </>
  );
};
