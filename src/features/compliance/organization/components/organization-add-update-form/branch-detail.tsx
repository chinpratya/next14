import { Typography, Row, Col, Form, Input } from 'antd';

import validation from '@/utils/validation';

export const BranchDetail = () => {
  return (
    <>
      <Typography.Text
        className="d-inline-block mt-3 mb-4"
        strong
      >
        รายละเอียดโรงพยาบาล
      </Typography.Text>
      <Row gutter={[34, 0]}>
        <Col span={12}>
          <Form.Item
            label="H Code"
            name="hcode"
            rules={[validation.required('ไม่พบ H Code')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="โรงพยาบาล"
            name="hospital"
            rules={[
              validation.required('ไม่พบโรงพยาบาล'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="สังกัด"
            name="agency"
            rules={[validation.required('ไม่พบสังกัด')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="ขนิดโรงพยาบาล"
            name="type"
            rules={[
              validation.required('ไม่พบขนิดโรงพยาบาล'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="ชั้นปัจจุบัน HA"
            name="currentHa"
            rules={[
              validation.required('ไม่พบชั้นปัจจุบัน HA'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="เขต"
            name="district"
            rules={[validation.required('ไม่พบเขต')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="จังหวัด"
            name="province"
            rules={[validation.required('ไม่พบจังหวัด')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="วันรับรอง HA"
            name="certifiedDate"
            rules={[
              validation.required('ไม่พบวันรับรอง HA'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="วันหมดอายุ HA"
            name="expireDate"
            rules={[
              validation.required('ไม่พบวันหมดอายุ HA'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
