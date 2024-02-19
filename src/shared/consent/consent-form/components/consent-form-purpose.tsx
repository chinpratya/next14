import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Card,
  Checkbox,
  Form,
  FormInstance,
  Radio,
  Select,
  Space,
  Typography,
} from 'antd';
import _ from 'lodash';
import { Switch, Case, Default } from 'react-if';

import { REQUIRED_COLOR } from '@/config/color';
import { ConsentPurposeType } from '@/types';

export type ConsentBuilderPurposeProps = {
  purpose: ConsentPurposeType;
  form?: FormInstance;
  name?: string;
};

export const ConsentBuilderPurpose = ({
  purpose,
  form,
  name,
}: ConsentBuilderPurposeProps) => {
  const rootName = name
    ? [name, purpose.purposeID]
    : [purpose.purposeID];

  return (
    <Form form={form} className="consent-form-purpose">
      <Card
        className={css`
          background: none;
          border: none;
          border-radius: 0;
          margin: 0;

          .ant-card-body {
            background: none;
            padding: 0 0 24px 0;
          }

          .ant-form-item {
            margin-bottom: 0;
          }
        `}
        bordered
      >
        <Flex direction="column" gap={16}>
          <Flex
            gap={8}
            direction={
              purpose.displayType === 'vertical'
                ? 'column'
                : 'row-reverse'
            }
            justify="start"
          >
            {purpose.displayType === 'vertical' ? (
              <Flex
                gap={8}
                direction="column"
                justify="start"
                align="start"
              >
                <div className="w-100 text-break d-flex flex-column">
                  <Typography.Text>
                    <label className="ant-form-item-required mr-1 text-danger">
                      *
                    </label>
                    {purpose.name}
                  </Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    {purpose.description}
                  </Typography.Text>
                </div>
                <Form.Item
                  name={[...rootName, 'isAccepted']}
                  rules={[
                    {
                      required: true,
                      message: 'กรุณาเลือก',
                    },
                  ]}
                >
                  <Radio.Group
                    options={[
                      {
                        label: 'ยินยอม',
                        value: true,
                      },
                      {
                        label: 'ไม่ยินยอม',
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
              </Flex>
            ) : (
              <Form.Item
                name={[...rootName, 'isAccepted']}
                valuePropName="checked"
              >
                <Checkbox>
                  <div className="w-100 text-break d-flex flex-column">
                    <Typography.Text>
                      {purpose.name}
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      {purpose.description}
                    </Typography.Text>
                  </div>
                </Checkbox>
              </Form.Item>
            )}
          </Flex>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              _.get(curValues, [
                ...rootName,
                'isAccepted',
              ]) !==
              _.get(prevValues, [
                ...rootName,
                'isAccepted',
              ])
            }
            noStyle
          >
            {({ getFieldValue }) => {
              if (
                !getFieldValue([
                  ...rootName,
                  'isAccepted',
                ])
              )
                return null;

              return (
                <>
                  {purpose.preferences.map(
                    (preference) => (
                      <Flex
                        direction="column"
                        gap={8}
                        key={preference.id}
                      >
                        <Typography.Text
                          className={css`
                            :before {
                              content: '*';
                              color: ${REQUIRED_COLOR};
                              margin-right: 4px;
                              font-size: 12px;
                            }
                          `}
                        >
                          {preference.name}
                        </Typography.Text>
                        <div>
                          <Switch>
                            <Case
                              condition={[
                                'radio-button-group',
                              ].includes(
                                preference?.attributeTypeID
                              )}
                            >
                              <Form.Item
                                name={[
                                  ...rootName,
                                  preference?.id,
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'กรุณาเลือกข้อมูล',
                                  },
                                ]}
                              >
                                <Radio.Group
                                  buttonStyle="solid"
                                  optionType="button"
                                  options={
                                    preference?.choices
                                  }
                                />
                              </Form.Item>
                            </Case>
                            <Case
                              condition={[
                                'radio-group',
                                'accept',
                              ].includes(
                                preference?.attributeTypeID
                              )}
                            >
                              <Form.Item
                                name={[
                                  ...rootName,
                                  preference?.id,
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'กรุณาเลือกข้อมูล',
                                  },
                                ]}
                              >
                                <Radio.Group>
                                  <Space direction="vertical">
                                    {preference?.choices?.map(
                                      (choice) => (
                                        <Radio
                                          key={choice}
                                          value={choice}
                                        >
                                          {choice}
                                        </Radio>
                                      )
                                    )}
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                            </Case>
                            <Case
                              condition={[
                                'checkbox-group',
                              ].includes(
                                preference?.attributeTypeID
                              )}
                            >
                              <Form.Item
                                name={[
                                  ...rootName,
                                  preference?.id,
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'กรุณาเลือกข้อมูล',
                                  },
                                ]}
                              >
                                <Checkbox.Group>
                                  <Space direction="vertical">
                                    {preference?.choices?.map(
                                      (choice) => (
                                        <Checkbox
                                          key={choice}
                                          value={choice}
                                        >
                                          {choice}
                                        </Checkbox>
                                      )
                                    )}
                                  </Space>
                                </Checkbox.Group>
                              </Form.Item>
                            </Case>
                            <Default>
                              <Form.Item
                                name={[
                                  ...rootName,
                                  preference?.id,
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'กรุณาเลือกข้อมูล',
                                  },
                                ]}
                              >
                                <Select
                                  className="w-100"
                                  options={preference?.choices?.map(
                                    (choice) => ({
                                      label: choice,
                                      value: choice,
                                    })
                                  )}
                                />
                              </Form.Item>
                            </Default>
                          </Switch>
                        </div>
                      </Flex>
                    )
                  )}
                </>
              );
            }}
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};
