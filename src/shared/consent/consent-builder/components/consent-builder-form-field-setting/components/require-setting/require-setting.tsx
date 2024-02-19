import { Form, Input, Switch } from 'antd';

import { validation } from '@/utils';

export const RequireSetting = () => {
  return (
    <>
      <Form.Item
        label="จำเป็น"
        name={['rules', 0, 'required']}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues?.rules?.[0]?.required !==
          currentValues?.rules?.[0]?.required
        }
        noStyle
      >
        {({ getFieldValue }) => {
          return getFieldValue([
            'rules',
            0,
            'required',
          ]) ? (
            <Form.Item
              label="ข้อความ"
              name={['rules', 0, 'message']}
              rules={[
                validation.required(
                  'Please enter a required message'
                ),
              ]}
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
    </>
  );
};
