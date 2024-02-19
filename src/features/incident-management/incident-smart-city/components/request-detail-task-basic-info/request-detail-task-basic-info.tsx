import {
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';

type RequestDetailTaskBasicInfoProps = {
  form: FormInstance;
};

export const RequestDetailTaskBasicInfo = ({
  form,
}: RequestDetailTaskBasicInfoProps) => {
  return (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col {...getColLayout(12)}>
          <Form.Item
            label="ชื่องาน"
            name="name"
            rules={[
              validation.required('กรุณากรอก ชื่องาน'),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...getColLayout(12)}>
          <Form.Item
            label="ผู้รับผิดชอบ"
            name="responsible"
            rules={[
              validation.required(
                'กรุณาเลือก ผู้รับผิดชอบ'
              ),
            ]}
          >
            <Select />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            label="กำหนดระดับความสำคัญ"
            name=""
            rules={[
              validation.required(
                'กรุณาเลือก กำหนดระดับความสำคัญ'
              ),
            ]}
          >
            <Select />
          </Form.Item>
          <Form.Item
            label="รายละเอียดงาน"
            name="description"
            rules={[
              validation.required(
                'กรุณากรอก รายละเอียดงาน'
              ),
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="">
            <Checkbox.Group
              options={[
                {
                  label: 'งานที่จำเป็น',
                  value: 'isRequired',
                },
                {
                  label: 'แสดงความคิดเห็นของงาน',
                  value: 'isComment',
                },
                {
                  label: 'ความละเอียดที่ต้องการ',
                  value: 'isResolution',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
