import { Form, Switch } from 'antd';

export const AddOptionWidget = () => {
  return (
    <>
      <Form.Item
        label="เพิ่มตัวเลือกได้"
        valuePropName="checked"
        name="addOption"
      >
        <Switch />
      </Form.Item>
    </>
  );
};
