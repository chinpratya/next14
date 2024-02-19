import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  // Card,
  Col,
  Form,
  FormInstance,
  Input,
  Select,
} from 'antd';

import { getColLayout } from '@/utils';

type WorkflowTaskConditionDynamicFormProps = {
  form?: FormInstance;
};
export const WorkflowTaskConditionDynamicForm =
  ({}: WorkflowTaskConditionDynamicFormProps) => {
    return (
      <>
        <Col {...getColLayout(24)}>
          <Flex
            direction="column"
            style={{ paddingTop: 10 }}
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(
                    ({ key, name, ...restField }) => (
                      <>
                        <Flex
                          key={key}
                          justify="space-between"
                          direction="row"
                          align="center"
                          gap={10}
                        >
                          <Form.Item
                            {...restField}
                            label="เงื่อนไข"
                            name={[name, 'condition']}
                            style={{
                              width: '25%',
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              placeholder="เลือกข้อมูล"
                              defaultValue="1"
                              options={[
                                {
                                  value: '1',
                                  label:
                                    'แจ้งเตือนก่อนถึงกำหนด',
                                },
                                {
                                  value: '2',
                                  label:
                                    'แจ้งเตือนหลังเลยกำหนด',
                                },
                              ]}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label="เวลา"
                            name={[name, 'time']}
                            style={{
                              width: '25%',
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              placeholder="กรอก"
                              type="number"
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label="หน่วย"
                            name={[name, 'unit']}
                            style={{
                              width: '25%',
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              placeholder="หน่วยเวลา"
                              options={[
                                {
                                  value: 'day',
                                  label: 'วัน',
                                },
                                {
                                  value: 'hour',
                                  label: 'ชั่วโมง',
                                },
                                {
                                  value: 'minint',
                                  label: 'นาที',
                                },
                              ]}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label="ข้อความแจ้งเตือน"
                            name={[name, 'message']}
                            style={{
                              width: '100%',
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input placeholder="กรอก" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            style={{
                              color: '#DE4436',
                              fontSize: '25px',
                            }}
                          />
                        </Flex>
                      </>
                    )
                  )}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{
                        width: '20%',
                        color: '#3E79F7',
                        borderColor: '#3E79F7',
                        borderWidth: '1px',
                      }}
                    >
                      เพื่ม
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Flex>
        </Col>
      </>
    );
  };
