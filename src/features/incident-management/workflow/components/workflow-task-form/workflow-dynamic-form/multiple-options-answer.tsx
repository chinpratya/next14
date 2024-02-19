import {
  // CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  Input,
  Col,
  Button,
} from 'antd';
import React from 'react';

import { PrefixCircleIconOutlined } from '@/components/util-components/icon';
import { getColLayout } from '@/utils';

type WorkflowMultiOptionsAnswerProps = {
  form?: FormInstance;
};

export const WorkflowMultiOptionsAnswer =
  ({}: WorkflowMultiOptionsAnswerProps) => {
    const [state, setstate] =
      React.useState<boolean>(false);

    return (
      <Col {...getColLayout(24)}>
        <Form.List name="names">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <>
                  <Flex
                    direction="row"
                    align="center"
                    gap={20}
                  >
                    <Form.Item
                      label={`Option ${index + 1}`}
                      required={false}
                      key={index}
                      style={{ width: '100%' }}
                      name={`option_${index + 1}`}
                    >
                      <Input
                        prefix={
                          <PrefixCircleIconOutlined />
                        }
                        placeholder={`Option ${
                          index + 1
                        }`}
                      />
                    </Form.Item>
                    {fields.length >= 2 && (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{
                          fontSize: '30px',
                          color: '#DE4436',
                        }}
                      />
                    )}
                  </Flex>
                </>
              ))}

              {state === true && (
                <>
                  <Flex
                    direction="row"
                    align="center"
                    gap={20}
                  >
                    <Form.Item
                      label={`Other`}
                      name="other_opiton"
                      style={{ width: '100%' }}
                    >
                      <Input
                        prefix={
                          <PrefixCircleIconOutlined />
                        }
                        disabled
                        placeholder="Other..."
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => setstate(false)}
                      style={{
                        fontSize: '30px',
                        color: '#DE4436',
                      }}
                    />
                  </Flex>
                </>
              )}
              <Form.Item>
                <Flex direction="row" gap={20}>
                  <Button
                    type="primary"
                    onClick={() => add()}
                    style={{
                      borderRadius: '12px',
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Option
                  </Button>
                  {state === false && (
                    <Button
                      onClick={() => {
                        setstate(true);
                      }}
                      style={{
                        color: '#3E79F7',
                        borderRadius: '12px',
                        borderColor: '#3E79F7',
                      }}
                      icon={<PlusOutlined />}
                    >
                      {` Add "Other"`}
                    </Button>
                  )}
                </Flex>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    );
  };
