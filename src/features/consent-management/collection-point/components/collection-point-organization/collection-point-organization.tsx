import { Form, FormInstance, Select } from 'antd';

import validation from '@/utils/validation';

type CollectionPointOrganizationProps = {
  form: FormInstance;
};

export const CollectionPointOrganization = ({
  form,
}: CollectionPointOrganizationProps) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name=""
        label="ผู้ที่รับมอบหมาย"
        rules={[
          validation.required(
            'กรุณาเลือก ผู้ที่รับมอบหมาย'
          ),
        ]}
      >
        <Select options={[]} />
      </Form.Item>
      <Form.Item
        name=""
        label="องค์กร"
        rules={[validation.required('กรุณาเลือก องค์กร')]}
      >
        <Select options={[]} />
      </Form.Item>
    </Form>
  );
};
