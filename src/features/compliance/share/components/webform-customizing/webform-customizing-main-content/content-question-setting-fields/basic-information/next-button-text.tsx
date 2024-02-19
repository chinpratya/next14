import { Form, Input } from 'antd';

import validation from '@/utils/validation';

export const NextButtonText = () => {
  return (
    <Form.Item
      label="ชื่อปุ่มถัดไป"
      name="nextButtonText"
      rules={[validation.required('next button text')]}
    >
      <Input />
    </Form.Item>
  );
};
