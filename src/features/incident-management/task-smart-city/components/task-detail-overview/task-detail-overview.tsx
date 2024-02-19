import {
  Checkbox,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Tag,
} from 'antd';

import { useListUser } from '@/features/admin';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { CommentBox } from '@components/comment-box';

type TaskDetailOverviewProps = {
  form: FormInstance;
  taskId: string;
};

export const TaskDetailOverview = ({
  form,
  taskId,
}: TaskDetailOverviewProps) => {
  const { data } = useListUser({});
  const userOptions = data?.data?.map((user) => ({
    label: user.email,
    value: user.userId,
  }));
  return (
    <Form form={form} layout="vertical">
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Form.Item
            label="ชื่องาน"
            name="workName"
            rules={[
              validation.required('กรุณากรอก ชื่องาน'),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col {...getColLayout(12)}>
          <Form.Item
            label="ผู้ที่รับผิดชอบ"
            name="approveID"
            rules={[
              validation.required(
                'กรุณาเลือก ผู้ที่รับผิดชอบ'
              ),
            ]}
          >
            <Select options={userOptions} disabled />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            label="กำหนดระดับความสำคัญ"
            name="labels"
            rules={[
              validation.required(
                'กรุณาเลือก กำหนดระดับความสำคัญ'
              ),
            ]}
          >
            <Select
              options={[
                {
                  label: <Tag color="error">High</Tag>,
                  value: 'high',
                },
                {
                  label: (
                    <Tag color="warning">Medium</Tag>
                  ),
                  value: 'medium',
                },
                {
                  label: <Tag color="success">Low</Tag>,
                  value: 'low',
                },
              ]}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="รายละเอียด"
            name="description"
            rules={[
              validation.required('กรุณากรอก รายละเอียด'),
            ]}
          >
            <Input.TextArea disabled rows={3} />
          </Form.Item>
          <Form.Item
            name="isRequired"
            valuePropName="checked"
          >
            <Checkbox disabled>งานที่จำเป็น</Checkbox>
          </Form.Item>
          <Form.Item
            name="isComment"
            valuePropName="checked"
          >
            <Checkbox disabled>
              แสดงความคิดเห็นของงาน
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="isResolution"
            valuePropName="checked"
          >
            <Checkbox disabled>
              ความละเอียดที่ต้องการ
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Divider />
      <CommentBox
        module="dsar"
        submodule="task"
        pageidorname={taskId}
      />
    </Form>
  );
};
