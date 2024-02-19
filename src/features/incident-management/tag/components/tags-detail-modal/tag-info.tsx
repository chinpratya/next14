import { Form, Input } from 'antd';

import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export const TagInfo = () => {
  return (
    <>
      <Form.Item
        label={
          <IntlMessage id="dsarAutomation.tags.name" />
        }
        name="name"
        rules={[validation.required('Please input name')]}
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
