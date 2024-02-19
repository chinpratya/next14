import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserSelect } from '../../../../admin';
import { useListWorkflowUser } from '../../../workflow';

export type TaskWidgetNotificationProps = {
  workflowId?: string;
  readOnly?: boolean;
};

export const TaskWidgetNotification = ({
  workflowId,
  readOnly,
}: TaskWidgetNotificationProps) => {
  const { t } = useTranslation();

  const workflowUser = useListWorkflowUser(
    workflowId ?? ''
  );

  const delegateOptions = workflowUser.data?.data?.map(
    (user) => ({
      label: user.name,
      value: user.userID,
    })
  );

  const notificationTypeOptions = [
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.type.ontime" />
      ),
      value: 'ontime',
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.type.before" />
      ),
      value: 'before',
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.type.after" />
      ),
      value: 'after',
    },
  ];

  return (
    <div
      style={{
        cursor: readOnly ? 'not-allowed' : 'auto',
      }}
    >
      <Row
        justify={'space-between'}
        style={{
          pointerEvents: readOnly ? 'none' : 'auto',
        }}
      >
        <Col>
          <Typography.Title level={3} className="mb-4">
            <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task.related" />{' '}
            :
          </Typography.Title>
        </Col>
        <Col>
          <Form.Item
            name="isMailRelated"
            valuePropName="checked"
          >
            <Switch
              checkedChildren={
                <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task.on" />
              }
              unCheckedChildren={
                <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task.off" />
              }
              // style={{
              //   pointerEvents: readOnly ? 'none' : 'auto',
              // }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isMailRelated !==
          currentValues.isMailRelated
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const isMailRelated = getFieldValue(
            'isMailRelated'
          );
          if (isMailRelated) {
            return (
              <Form.Item
                name={'mailRelated'}
                label="ผู้รับการแจ้งเตือน"
                rules={[
                  validation.required(
                    t(
                      'dsarAutomation.request.detail.task.assign.notificationRecipient'
                    )
                  ),
                ]}
              >
                <Select
                  options={delegateOptions}
                  mode="multiple"
                  style={{
                    pointerEvents: readOnly
                      ? 'none'
                      : 'auto',
                  }}
                />
              </Form.Item>
            );
          }
          return null;
        }}
      </Form.Item>

      <Row
        justify={'space-between'}
        style={{
          pointerEvents: readOnly ? 'none' : 'auto',
        }}
      >
        <Col>
          <Typography.Title level={3} className="mb-4">
            <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task" />{' '}
            :
          </Typography.Title>
        </Col>
        <Col>
          <Form.Item
            name="isSetNotificationTime"
            valuePropName="checked"
          >
            <Switch
              checkedChildren={
                <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task.on" />
              }
              unCheckedChildren={
                <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.task.off" />
              }
              style={{
                pointerEvents: readOnly ? 'none' : 'auto',
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isSetNotificationTime !==
          currentValues.isSetNotificationTime
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const isSetNotificationTime = getFieldValue(
            'isSetNotificationTime'
          );
          if (isSetNotificationTime) {
            return (
              <Form.List name="reminded">
                {(fields, { add, remove }) => {
                  return (
                    <div
                      style={{
                        pointerEvents: readOnly
                          ? 'none'
                          : 'auto',
                      }}
                    >
                      {fields.map((field) => (
                        <Flex
                          key={field.key}
                          align="center"
                          justify="space-between"
                          gap={12}
                        >
                          <div className="w-100 pr-4">
                            <Flex gap={24}>
                              <Form.Item
                                {...field}
                                label={
                                  <IntlMessage id="dsarAutomation.request.detail.task.assign.notification" />
                                }
                                name={[
                                  field.name,
                                  'type',
                                ]}
                                className="w-50"
                                rules={[
                                  validation.required(
                                    t(
                                      'dsarAutomation.request.detail.task.assign.notificationValidation'
                                    )
                                  ),
                                ]}
                              >
                                <Select
                                  options={
                                    notificationTypeOptions
                                  }
                                />
                              </Form.Item>
                              <Flex
                                style={{ marginTop: 30 }}
                                className="w-50"
                                align="center"
                                justify="center"
                                gap={8}
                              >
                                <Form.Item
                                  noStyle
                                  shouldUpdate={(
                                    prev,
                                    next
                                  ) =>
                                    prev?.reminded?.[
                                      field.name
                                    ]?.type !==
                                    next?.reminded?.[
                                      field.name
                                    ]?.type
                                  }
                                >
                                  {({
                                    getFieldValue,
                                  }) => {
                                    const type =
                                      getFieldValue([
                                        'reminded',
                                        field.name,
                                        'type',
                                      ]);

                                    if (
                                      type !== 'before' &&
                                      type !== 'after'
                                    )
                                      return null;

                                    return (
                                      <>
                                        <Form.Item
                                          {...field}
                                          name={[
                                            field.name,
                                            'time',
                                          ]}
                                          className="w-100"
                                          rules={[
                                            validation.required(
                                              t(
                                                'dsarAutomation.request.detail.task.assign.notification.notificationPeriodValidation'
                                              )
                                            ),
                                          ]}
                                        >
                                          <InputNumber
                                            min={1}
                                            max={365}
                                            style={{
                                              width:
                                                '100%',
                                            }}
                                          />
                                        </Form.Item>
                                        <Typography.Text className="mb-4">
                                          <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.day" />
                                        </Typography.Text>
                                      </>
                                    );
                                  }}
                                </Form.Item>
                              </Flex>
                            </Flex>
                            <Form.Item
                              {...field}
                              label={
                                <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.responsible" />
                              }
                              name={[
                                field.name,
                                'responsible',
                              ]}
                              rules={[
                                validation.required(
                                  t(
                                    'dsarAutomation.request.detail.task.assign.notification.responsibleValidation'
                                  )
                                ),
                              ]}
                            >
                              {workflowId ? (
                                <Select
                                  options={
                                    delegateOptions
                                  }
                                  mode="multiple"
                                  loading={
                                    workflowUser.isLoading
                                  }
                                  showSearch
                                  optionFilterProp="label"
                                />
                              ) : (
                                <UserSelect mode="multiple" />
                              )}
                            </Form.Item>
                          </div>
                          <DeleteOutlined
                            onClick={() =>
                              remove(field.name)
                            }
                          />
                        </Flex>
                      ))}
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                        type="dashed"
                        block
                        className="mt-4"
                        disabled={readOnly}
                      >
                        <IntlMessage id="dsarAutomation.request.detail.task.assign.notification.add" />
                      </Button>
                    </div>
                  );
                }}
              </Form.List>
            );
          }
          return null;
        }}
      </Form.Item>
    </div>
  );
};
