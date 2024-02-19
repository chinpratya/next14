import { MailOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from 'antd';
import Link from 'next/link';

import validation from '@/utils/validation';

export const SimpleForm = () => (
  <Form layout="vertical">
    <Form.Item
      label="Email"
      name="email"
      rules={[
        validation.required('กรุณากรอกอีเมล์'),
        validation.email(),
      ]}
    >
      <Input
        name="email"
        prefix={<MailOutlined className="text-primary" />}
      />
    </Form.Item>
    <Form.Item
      name="accept"
      valuePropName="checked"
      rules={[validation.required('ยอมรับเงื่อนไข')]}
    >
      <Checkbox data-testid="accept">
        <Typography.Text>
          ฉันยอมรับ
          <Link href="/terms">เงื่อนไขการใช้งาน</Link>
          และ
          <Link href="/privacy">
            นโยบายความเป็นส่วนตัว
          </Link>
        </Typography.Text>
      </Checkbox>
    </Form.Item>
    <Form.Item>
      <Button
        id="email"
        type="primary"
        htmlType="submit"
        block
      >
        Continue
      </Button>
    </Form.Item>
  </Form>
);
