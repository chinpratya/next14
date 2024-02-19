import { Form, FormInstance, Input, Col } from 'antd';

import { getColLayout, validation } from '@/utils';

type WorkflowParagraphAnswerProps = {
  form?: FormInstance;
};

export const WorkflowParagraphAnswer =
  ({}: WorkflowParagraphAnswerProps) => {
    const { TextArea } = Input;
    return (
      <Col {...getColLayout(24)}>
        <Form.Item
          label="รูปแบบคำตอบ"
          name={'answer_form_paragraph'}
          rules={[validation.required('กรุณาระบุชื่อ')]}
        >
          <TextArea
            disabled
            placeholder="Long answer text"
          />
        </Form.Item>
      </Col>
    );
  };
