import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  Col,
  TimePicker,
  Checkbox,
} from 'antd';

import { getColLayout } from '@/utils';

type WorkflowTimeAnswerProps = {
  form?: FormInstance;
};

export const WorkflowTimeAnswer =
  ({}: WorkflowTimeAnswerProps) => {
    return (
      <Col {...getColLayout(24)}>
        <Flex direction="row" gap={20}>
          <Form.Item
            label="Time"
            required
            style={{ width: '100%' }}
            name="start_time"
          >
            <TimePicker
              disabled
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Flex>

        <Flex justify="space-between" align="flex-start">
          <Form.Item
            name={'check_1'}
            valuePropName="checked"
          >
            <Checkbox>
              Enter END date and time information
            </Checkbox>
          </Form.Item>
        </Flex>

        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.check_1 !== curValues.check_1
          }
          noStyle
        >
          {({ getFieldsValue }) => {
            return (
              <>
                {getFieldsValue().check_1 && (
                  <Flex direction="row" gap={20}>
                    <Form.Item
                      label="Time"
                      required
                      style={{ width: '100%' }}
                      name="end_time"
                    >
                      <TimePicker
                        disabled
                        style={{
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                  </Flex>
                )}
              </>
            );
          }}
        </Form.Item>
      </Col>
    );
  };
