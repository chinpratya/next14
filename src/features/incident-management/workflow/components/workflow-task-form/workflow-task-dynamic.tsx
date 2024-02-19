// import { css } from '@emotion/css';
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DownCircleOutlined,
  CloudUploadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {
  Col,
  Form,
  // Card,
  //   Form,
  FormInstance,
  Input,
  Select,
} from 'antd';
import { useMemo } from 'react';
import { z } from 'zod';

import { getColLayout, validation } from '@/utils';

import { WorkflowCheckBoxAnswer } from './workflow-dynamic-form/checkbox-answer';
import { WorkflowDateAnswer } from './workflow-dynamic-form/date-answer';
import { WorkflowDateTimeAnswer } from './workflow-dynamic-form/date-time-answer';
import { WorkflowMultiOptionsAnswer } from './workflow-dynamic-form/multiple-options-answer';
import { WorkflowParagraphAnswer } from './workflow-dynamic-form/paragraph-answer';
import { WorkflowScollDownAnswer } from './workflow-dynamic-form/scroll-down-answer';
import { WorkflowTimeAnswer } from './workflow-dynamic-form/time-answer';
import { WorkflowUploadFileAnswer } from './workflow-dynamic-form/upload-file-answer';

const ans_type = z.enum([
  'paragraph',
  'multiple_options',
  'checkbox',
  'scroll_down',
  'upload_file',
  'datetime',
  'date',
  'time',
]);
type AnswerType = z.infer<typeof ans_type>;

type WorkflowTaskSetScheuleTableProps = {
  form?: FormInstance;
  label?: string;
  type?: string;
};
// widget
export const WorkflowTaskDynamicForm =
  ({}: WorkflowTaskSetScheuleTableProps) => {
    const answerTypeOptions = useMemo(() => {
      return [
        {
          value: ans_type.enum.paragraph,
          label: (
            <>
              <AlignLeftOutlined /> &nbsp; {'Paragraph'}
            </>
          ),
        },
        {
          value: ans_type.enum.multiple_options,
          label: (
            <>
              <CheckCircleOutlined /> &nbsp;
              {'Multiple Options'}
            </>
          ),
        },
        {
          value: ans_type.enum.checkbox,
          label: (
            <>
              <CheckSquareOutlined /> &nbsp;
              {'CheckBox'}
            </>
          ),
        },
        {
          value: ans_type.enum.scroll_down,
          label: (
            // <DownCircleOutlined />
            <>
              <DownCircleOutlined /> &nbsp;
              {'Scroll Down'}
            </>
          ),
        },
        {
          value: ans_type.enum.upload_file,
          label: (
            <>
              <CloudUploadOutlined /> &nbsp;
              {'Upload file'}
            </>
          ),
        },
        {
          value: ans_type.enum.datetime,
          label: (
            <>
              <CalendarOutlined />
              &nbsp;
              {'Date Time'}
            </>
          ),
        },
        {
          value: ans_type.enum.date,
          label: (
            <>
              <CalendarOutlined />
              &nbsp;
              {'Date'}
            </>
          ),
        },
        {
          value: ans_type.enum.time,
          label: (
            <>
              <ClockCircleOutlined />
              &nbsp;
              {'Time'}
            </>
          ),
        },
      ];
    }, []);
    return (
      <>
        <Col {...getColLayout(20)}>
          <Form.Item
            label="รายละเอียดหรือคำถาม"
            name={'category'}
            rules={[
              validation.required(
                'กรุณาเลือกหมวดหมู่เหตุการณ์'
              ),
            ]}
          >
            <Input placeholder="ระบุคำถาม" />
          </Form.Item>
        </Col>

        <Col {...getColLayout(4)}>
          <Form.Item
            label="รูปแบบคำตอบ"
            name={'answer_type'}
            rules={[
              validation.required(
                'กรุณาเลือกรูปแบบคำตอบ'
              ),
            ]}
          >
            <Select
              placeholder="เลือกรูปแบบคำตอบ"
              defaultValue="paragraph"
              options={answerTypeOptions}
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.answer_type !==
              curValues.answer_type
            }
            noStyle
          >
            {({ getFieldsValue }) => {
              return (
                <AnswerByType
                  type={
                    getFieldsValue().answer_type ||
                    'paragraph'
                  }
                />
              );
            }}
          </Form.Item>
        </Col>
      </>
    );
  };

type AnswerByTypeProps = {
  type?: AnswerType;
};

function AnswerByType({ type }: AnswerByTypeProps) {
  if (type === ans_type.enum.paragraph) {
    return <WorkflowParagraphAnswer />;
  }

  if (type === ans_type.enum.multiple_options) {
    return <WorkflowMultiOptionsAnswer />;
  }

  if (type === ans_type.enum.checkbox) {
    return <WorkflowCheckBoxAnswer />;
  }

  if (type === ans_type.enum.scroll_down) {
    return <WorkflowScollDownAnswer />;
  }

  if (type === ans_type.enum.upload_file) {
    return <WorkflowUploadFileAnswer />;
  }

  if (type === ans_type.enum.datetime) {
    return <WorkflowDateTimeAnswer />;
  }
  if (type === ans_type.enum.date) {
    return <WorkflowDateAnswer />;
  }
  if (type === ans_type.enum.time) {
    return <WorkflowTimeAnswer />;
  }
  return null;
}
