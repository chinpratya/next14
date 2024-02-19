import {
  Form,
  Radio,
  Divider,
  Row,
  Col,
  Input,
} from 'antd';

import { getColLayout } from '@/utils';

export const ActivityCollapsePurposeDetailForm = () => {
  return (
    <Form layout="vertical">
      <Divider />

      <Form.Item label="กฏหมาย PDPA" name="PDPA">
        <Radio.Group>
          <Radio value={1}>ต่ำกว่าไทย</Radio>
          <Radio value={2}>เทียบเท่าไทย</Radio>
          <Radio value={3}>สูงกว่าไทย</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item
        label="Data Processing Agreement (DPA) ?"
        name="DPA"
      >
        <Radio.Group>
          <Radio value={1}>ไม่มี</Radio>
          <Radio value={2}> มี</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item
        label="Personal Data Sharing Agreement"
        name="PDSA"
      >
        <Radio.Group>
          <Radio value={1}>ไม่มี</Radio>
          <Radio value={2}> มี</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Row justify={'space-between'}>
        <Col {...getColLayout(11)}>
          <Form.Item
            label="วิธีการโอนหรือเปิดเผยข้อมูล"
            name="disclose_information"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...getColLayout(11)}>
          <Form.Item
            label="มาตราการคุ้มครองข้อมูลส่วนบุคคล"
            name="personal_data"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
