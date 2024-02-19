import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export const TagInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={
          <IntlMessage id={tokens.dataBreach.tags.name} />
        }
        name="name"
        rules={[
          validation.required(
            t(tokens.dataBreach.tags.nameRequired)
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage
            id={tokens.dataBreach.tags.organization}
          />
        }
        name="organization"
      >
        <Input disabled />
      </Form.Item>
    </>
  );
};
