import { Form, Input, Switch } from 'antd';

import validation from '@/utils/validation';

export const RequiredWidget = () => {
  return (
    <>
      <Form.Item
        label="ที่จำเป็น"
        name="required"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.required !== currentValues.required
        }
        noStyle
      >
        {({ getFieldValue }) =>
          getFieldValue('required') ? (
            <Form.Item
              name="message"
              rules={[validation.required('ข้อความ')]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    </>
  );
};
