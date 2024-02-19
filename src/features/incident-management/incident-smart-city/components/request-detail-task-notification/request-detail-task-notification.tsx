import { PlusCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Form,
  FormInstance,
  InputNumber,
  Row,
  Select,
  Switch,
} from 'antd';
import { useState } from 'react';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';

type RequestDetailTaskNotificationProps = {
  form: FormInstance;
};

export const RequestDetailTaskNotification = ({
  form,
}: RequestDetailTaskNotificationProps) => {
  const [notificationType, setNotificationType] =
    useState('');

  return (
    <Form form={form} layout="vertical">
      <DescriptionBlock
        className="pr-2"
        title="วันสิ้นสุด"
        extra={
          <Form.Item className="mb-0" name="">
            <InputNumber />
          </Form.Item>
        }
      />
      <DescriptionBlock
        className="pr-2"
        title="กำหนดเวลาแจ้งเตือนงาน"
        description="กำหนดเวลาแจ้งเตือนงาน"
        extra={
          <Form.Item
            className="mb-0"
            name="isSetNoti"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          </Form.Item>
        }
      />
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isSetNoti !== currentValues.isSetNoti
        }
        noStyle
      >
        {({ getFieldValue }) => {
          if (!getFieldValue('isSetNoti')) {
            return null;
          }

          return (
            <>
              <DescriptionBlock
                className="pr-2"
                title="การแจ้งเตือนงาน"
                divider={false}
              />
              <Form.List
                name="document"
                initialValue={[
                  {
                    notificationType: '',
                    notiDt: '',
                  },
                ]}
              >
                {(fields, { add }) => (
                  <>
                    {fields.map((field) => (
                      <>
                        <Row gutter={[24, 0]}>
                          <Col {...getColLayout(12)}>
                            <Form.Item
                              label="การแจ้งเตือน"
                              name={[
                                field.name,
                                'notificationType',
                              ]}
                              rules={[
                                validation.required(
                                  'กรุณาเลือก การแจ้งเตือน'
                                ),
                              ]}
                            >
                              <Select
                                onChange={(value) =>
                                  setNotificationType(
                                    value
                                  )
                                }
                                options={[
                                  {
                                    label: 'ตามกำหนดเวลา',
                                    value: 'ตามกำหนดเวลา',
                                  },
                                  {
                                    label:
                                      'ก่อนกำหนดเวลา',
                                    value:
                                      'ก่อนกำหนดเวลา',
                                  },
                                  {
                                    label:
                                      'หลังกำหนดเวลา',
                                    value:
                                      'หลังกำหนดเวลา',
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          {[
                            'ก่อนกำหนดเวลา',
                            'หลังกำหนดเวลา',
                          ].includes(
                            notificationType
                          ) && (
                            <Col {...getColLayout(12)}>
                              <Form.Item
                                className={css`
                                  padding-top: 28px;
                                `}
                                name={[
                                  field.name,
                                  'notiDt',
                                ]}
                                rules={[
                                  validation.required(
                                    'กรุณาเลือก การแจ้งเตือน'
                                  ),
                                ]}
                              >
                                <InputNumber
                                  className="w-100"
                                  min="1"
                                />
                              </Form.Item>
                            </Col>
                          )}
                          <Col {...getColLayout(24)}>
                            <Form.Item
                              label="ผู้ที่รับผิดชอบ"
                              name={[field.name, '']}
                              rules={[
                                validation.required(
                                  'กรุณาเลือก ผู้ที่รับผิดชอบ'
                                ),
                              ]}
                            >
                              <Select options={[]} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    ))}
                    <Form.Item>
                      <Button
                        block
                        type="dashed"
                        icon={<PlusCircleOutlined />}
                        onClick={() => add()}
                      >
                        เพิ่ม
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
};
