import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  Input,
  Select,
  Upload,
} from 'antd';

import validation from '@/utils/validation';

type CollectionPointPrivacyPolicyProps = {
  form: FormInstance;
};

export const CollectionPointPrivacyPolicy = ({
  form,
}: CollectionPointPrivacyPolicyProps) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name=""
        label="นโยบายที่เกี่ยวข้อง"
        rules={[
          validation.required(
            'กรุณาเลือก ผู้ที่รับมอบหมาย'
          ),
        ]}
      >
        <Select options={[]} style={{ width: '30%' }} />
        <Select options={[]} style={{ width: '70%' }} />
      </Form.Item>
      <Form.Item
        name=""
        label="ลิงก์ประกาศนโยบายความเป็นส่วนตัว"
        rules={[
          validation.required(
            'กรุณากรอก ลิงก์ประกาศนโยบายความเป็นส่วนตัว'
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name=""
        label="เวอร์ชั่นนโยบายความเป็นส่วนตัว"
        rules={[
          validation.required(
            'กรุณากรอก เวอร์ชั่นนโยบายความเป็นส่วนตัว'
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="" label="อัปโหลด">
        <Upload>
          <Button icon={<UploadOutlined />}>
            แนบไฟล์
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
