import { Form, Switch } from 'antd';

export const VerticalAlignmentWidget = () => {
  return (
    <Form.Item
      label="การจัดข้อความคอลัมน์แนวตั้ง"
      valuePropName="checked"
      name="verticalAlignment"
    >
      <Switch />
    </Form.Item>
  );
};
