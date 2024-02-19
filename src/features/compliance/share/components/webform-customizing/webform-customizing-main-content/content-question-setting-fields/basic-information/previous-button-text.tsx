import { Form, Input } from 'antd';

import validation from '@/utils/validation';

export const PreviousButtonText = () => {
  return (
    <Form.Item
      label="ชื่อปุ่มย้อนกลับ"
      name="previousButtonText"
      rules={[
        validation.required('previous button text'),
      ]}
    >
      <Input />
    </Form.Item>
  );
};
