import { Form, Switch } from 'antd';

export const QuotationMark = () => {
  return (
    <Form.Item
      label="Quotation marks"
      valuePropName="checked"
      name="quotationMarks"
    >
      <Switch />
    </Form.Item>
  );
};
