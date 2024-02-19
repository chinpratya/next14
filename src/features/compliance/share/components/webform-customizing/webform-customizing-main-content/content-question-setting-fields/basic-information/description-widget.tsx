import { Form, Input } from 'antd';

export const DescriptionWidget = () => (
  <Form.Item label="คำอธิบาย" name="description">
    <Input.TextArea rows={4} />
  </Form.Item>
);
