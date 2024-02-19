import { Form, Input } from 'antd';

import validation from '@/utils/validation';

export const TitleWidget = () => (
  <Form.Item
    label="หัวข้อ"
    name="title"
    rules={[validation.required('หัวข้อ')]}
  >
    <Input />
  </Form.Item>
);
