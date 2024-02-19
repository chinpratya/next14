import { Form, Switch } from 'antd';

export const MultipleSelectionWidget = () => {
  return (
    <Form.Item
      label="Multiple selection"
      valuePropName="checked"
      name="multipleSelection"
    >
      <Switch />
    </Form.Item>
  );
};
