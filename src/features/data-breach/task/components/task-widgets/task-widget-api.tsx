import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Form,
  Input,
  Switch,
  Typography,
} from 'antd';
import axios from 'axios';
import _ from 'lodash';
import { useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { tokens } from '@/lang';
import { useAuth } from '@/stores/auth';
import { validation } from '@/utils';
import { CodePreview } from '@components/code-preview';
import { APIIconOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

export type TaskWidgetApiProps = {
  taskId?: string;
  readOnly?: boolean;
};

export const TaskWidgetApi = ({
  taskId,
  readOnly,
}: TaskWidgetApiProps) => {
  const { t } = useTranslation();
  const { access_token } = useAuth();

  const inputRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<
    Record<string, unknown>
  >({});

  const onTestApi = async () => {
    try {
      const value = _.get(
        inputRef?.current,
        'input.value'
      );
      if (!value) return;
      setResult({
        message: 'Loading...',
      });
      setLoading(true);

      const requestConfig = readOnly
        ? {
            method: 'get',
            url: `/work/${taskId}/api`,
            baseURL:
              API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
            headers: {
              Authorization: access_token,
            },
          }
        : {
            method: 'post',
            url: value,
          };

      const response = await axios(requestConfig);

      setResult({
        ...response,
      });
      setLoading(false);
    } catch (error) {
      setResult(error as Record<string, unknown>);
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        className="mb-4"
      >
        <Flex align="center" gap="md">
          <APIIconOutlined
            width={42}
            height={42}
            className="text-primary"
          />
          <div>
            <Typography.Title level={4}>
              <IntlMessage
                id={tokens.dataBreach.task.api}
              />
            </Typography.Title>
            <Typography.Text type="secondary">
              <IntlMessage
                id={tokens.dataBreach.task.apiDesc}
              />
            </Typography.Text>
          </div>
        </Flex>
        <div
          style={{
            cursor: readOnly ? 'not-allowed' : 'auto',
          }}
        >
          <div
            style={{
              pointerEvents: readOnly ? 'none' : 'auto',
            }}
          >
            <Form.Item
              name="isAPI"
              noStyle
              valuePropName="checked"
            >
              <Switch
                checkedChildren={
                  <IntlMessage id={tokens.common.on} />
                }
                unCheckedChildren={
                  <IntlMessage id={tokens.common.off} />
                }
              />
            </Form.Item>
          </div>
        </div>
      </Flex>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isAPI !== currentValues.isAPI
        }
      >
        {({ getFieldValue }) => {
          const isAPI = getFieldValue('isAPI') ?? false;
          if (!isAPI) return null;
          return (
            <>
              <Flex
                align="center"
                justify="space-between"
                gap="md"
              >
                <Form.Item
                  label={
                    <IntlMessage
                      id={tokens.dataBreach.task.apiURL}
                    />
                  }
                  name="apiURL"
                  className="w-100"
                  rules={[
                    validation.required(
                      t(
                        tokens.dataBreach.task
                          .apiURLRequired
                      )
                    ),
                    validation.url(),
                  ]}
                >
                  <Input
                    ref={inputRef}
                    prefix={
                      <APIIconOutlined className="text-primary" />
                    }
                    placeholder={
                      t(
                        tokens.dataBreach.task
                          .apiURLPlaceholder
                      ) as string
                    }
                    className="w-100"
                    readOnly={readOnly}
                  />
                </Form.Item>
                <Form.Item style={{ marginTop: 30 }}>
                  <Button
                    type="primary"
                    onClick={onTestApi}
                    loading={loading}
                  >
                    {readOnly ? (
                      <IntlMessage
                        id={
                          tokens.dataBreach.task.receive
                        }
                      />
                    ) : (
                      <IntlMessage
                        id={tokens.dataBreach.task.test}
                      />
                    )}
                  </Button>
                </Form.Item>
              </Flex>
              <Typography className="mb-2">
                <IntlMessage
                  id={tokens.dataBreach.task.log}
                />
              </Typography>
              <Card style={{ minHeight: '100px' }}>
                <Scrollbars style={{ height: '50vh' }}>
                  <CodePreview
                    disabledCopy={true}
                    code={JSON.stringify(result, null, 2)}
                  />
                </Scrollbars>
              </Card>
            </>
          );
        }}
      </Form.Item>
    </>
  );
};
