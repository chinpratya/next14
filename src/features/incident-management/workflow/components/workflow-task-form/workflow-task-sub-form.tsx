import { Flex } from '@mantine/core';
import {
  // Button,
  // Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  // Select,
  Switch,
  Typography,
  Divider,
} from 'antd';

import { getColLayout } from '@/utils';

import { WorkflowTaskConditionDynamicForm } from './workflow-task-condition-dynamic-form';

type WorkflowTaskSubFormProps = {
  form?: FormInstance;
};
export const WorkflowTaskSubForm =
  ({}: WorkflowTaskSubFormProps) => {
    const { Text, Link } = Typography;
    return (
      <>
        <Col {...getColLayout(24)}>
          <Typography
            style={{
              marginBottom: '20px',
              marginTop: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ตั้งค่าการเตือน
          </Typography>
          <Flex justify="space-between">
            <Typography>
              กำหนดเวลาแจ้งเตือนงาน
              <Typography>
                กำหนดเวลาแจ้งเตือนการทำงาน :
              </Typography>
            </Typography>
            <Form.Item
              name={'set_time'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Flex>

          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.set_time !== curValues.set_time
            }
            noStyle
          >
            {({ getFieldsValue }) => {
              return (
                <>
                  {getFieldsValue().set_time === true ? (
                    <>
                      <Flex
                        direction="column"
                        style={{ paddingTop: 10 }}
                      >
                        <>
                          {' '}
                          <WorkflowTaskConditionDynamicForm />
                        </>
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            }}
          </Form.Item>

          <Divider
            style={{ margin: '-10px 0px 10px 0px' }}
          />
          <Typography style={{ marginBottom: '20px' }}>
            ตั้งค่าการแจ้งเตือน
          </Typography>

          <Flex justify="space-between">
            <Typography>
              E-Mail
              <Typography>
                อนุญาตการแจ้งเตือนไปยังผู้รับผิดชอบ
              </Typography>
            </Typography>
            <Form.Item
              name={'email'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Flex>

          <Divider
            style={{ margin: '-10px 0px 10px 0px' }}
          />

          <Flex justify="space-between">
            <Typography>
              LINE
              <Typography>
                อนุญาตการแจ้งเตือนไปยังผู้รับผิดชอบ
              </Typography>
            </Typography>
            <Form.Item
              name={'line'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Flex>

          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.email ||
              prevValues.line !== curValues.email ||
              curValues.line
            }
            noStyle
          >
            {({ getFieldsValue }) => {
              return (
                <>
                  {(getFieldsValue().email === true ||
                    getFieldsValue().line) === true ? (
                    <>
                      <Flex
                        direction="column"
                        style={{ paddingTop: 10 }}
                      >
                        <Form.Item name={'open_checkbox'}>
                          <Checkbox defaultChecked>
                            OPEN
                          </Checkbox>
                        </Form.Item>

                        <Form.Item name={'open_answer'}>
                          <Input
                            placeholder="ข้อความ Default"
                            disabled
                          />
                        </Form.Item>

                        <Form.Item
                          name={'in_progress_checkbox'}
                        >
                          <Checkbox defaultChecked>
                            IN PROGRESS
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                          name={'in_progress_answer'}
                        >
                          <Input
                            placeholder="ข้อความ Default"
                            disabled
                          />
                        </Form.Item>

                        <Form.Item
                          name={'cancel_checkbox'}
                        >
                          <Checkbox defaultChecked>
                            CANCEL
                          </Checkbox>
                        </Form.Item>

                        <Form.Item name={'cancel_answer'}>
                          <Input
                            placeholder="ข้อความ Default"
                            disabled
                          />
                        </Form.Item>

                        <Form.Item
                          name={'reject_checkbox'}
                        >
                          <Checkbox defaultChecked>
                            REJECT
                          </Checkbox>
                        </Form.Item>

                        <Form.Item name={'reject_answer'}>
                          <Input
                            placeholder="ข้อความ Default"
                            disabled
                          />
                        </Form.Item>
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            }}
          </Form.Item>
        </Col>
      </>
    );
  };
