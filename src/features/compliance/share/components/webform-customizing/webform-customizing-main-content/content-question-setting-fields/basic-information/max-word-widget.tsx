import { Form, InputNumber, Switch } from 'antd';

import validation from '@/utils/validation';

export const MaxWordWidget = () => (
  <>
    <Form.Item
      label="จำนวนคำสูงสุด"
      name="maxWord"
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
    <Form.Item
      shouldUpdate={(prevValues, currentValues) =>
        prevValues.maxWord !== currentValues.maxWord
      }
      noStyle
    >
      {({ getFieldValue }) =>
        getFieldValue('maxWord') ? (
          <Form.Item
            name="maxWordCount"
            rules={[validation.required('จำนวนคำสูงสุด')]}
          >
            <InputNumber className="w-100" />
          </Form.Item>
        ) : null
      }
    </Form.Item>
  </>
);
