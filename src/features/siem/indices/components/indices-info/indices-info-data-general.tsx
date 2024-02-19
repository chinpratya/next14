import { Card, Form, Input } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

export const IndicesInfoDataGeneral = () => {
  return (
    <Card
      title={
        <IntlMessage id="siem.indices.basicInfomation.dataGeneral" />
      }
    >
      <Form.Item
        name="name"
        label={
          <IntlMessage id="siem.indices.basicInfomation.name" />
        }
        rules={[
          validation.required('Name'),
          validation.trim(),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="alias_name"
        label={
          <IntlMessage id="siem.indices.basicInfomation.aliasName" />
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
          <IntlMessage id="siem.indices.basicInfomation.description" />
        }
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </Card>
  );
};
