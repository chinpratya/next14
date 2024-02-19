import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  Form,
  InputNumber,
  Select,
  Switch,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserSelect } from '../../../../admin';
import {
  useGetWorkflowMeta,
  useListWorkflowUser,
} from '../../../workflow';

export type TaskWidgetNotificationProps = {
  workflowId?: string;
  readOnly?: boolean;
};

export const TaskWidgetNotification = ({
  workflowId,
  readOnly,
}: TaskWidgetNotificationProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const workflowUser = useListWorkflowUser(
    workflowId ?? ''
  );

  const workflowMeta = useGetWorkflowMeta();

  const timeTypeMeta = workflowMeta?.data?.time_type;

  const workflowDurationTypeOptions = timeTypeMeta?.map(
    (durationType) => ({
      label: durationType?.name,
      value: durationType?.ObjectUUID,
    })
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
        <IntlMessage id={tokens.dataBreach.task.onTime} />
      ),
      value: 'ontime',
    },
    {
      label: (
        <IntlMessage id={tokens.dataBreach.task.before} />
      ),
      value: 'before',
    },
    {
      label: (
        <IntlMessage id={tokens.dataBreach.task.after} />
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          reminded: [
            {
              type: 'ontime',
            },
          ],
        }}
      >
        <DescriptionBlock
          title={
            <IntlMessage
              id={tokens.dataBreach.task.taskNotification}
            />
          }
          description={
            <Typography.Text type="secondary">
              <IntlMessage
                id={
                  tokens.dataBreach.task
                    .taskNotificationDesc
                }
              />
            </Typography.Text>
          }
          divider={false}
          extra={
            <Form.Item
              name="isSetNotificationTime"
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
          }
        />
        <Form.Item
          shouldUpdate={(prevValues, nextValues) =>
            prevValues?.isSetNotificationTime !==
            nextValues?.isSetNotificationTime
          }
        >
          {({ getFieldValue }) => {
            const isSetNotificationTime = getFieldValue(
              'isSetNotificationTime'
            );

            if (!isSetNotificationTime) return null;

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
                                  <IntlMessage
                                    id={
                                      tokens.dataBreach
                                        .task.notification
                                    }
                                  />
                                }
                                name={[
                                  field.name,
                                  'type',
                                ]}
                                className="w-50"
                                rules={[
                                  validation.required(
                                    t(
                                      tokens.dataBreach
                                        .task
                                        .notificationRequired
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
                                {({ getFieldValue }) => {
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
                                    <Form.Item
                                      label={
                                        <IntlMessage
                                          id={
                                            tokens
                                              .dataBreach
                                              .task
                                              .workingPeriod
                                          }
                                        />
                                      }
                                      className="w-50"
                                      required
                                    >
                                      <Flex gap={8}>
                                        <Form.Item
                                          shouldUpdate={(
                                            prevValues,
                                            nextValues
                                          ) =>
                                            prevValues?.[
                                              field?.name
                                            ]?.time
                                              ?.type !==
                                            nextValues?.[
                                              field?.name
                                            ]?.time?.type
                                          }
                                          className="w-100 mb-0"
                                        >
                                          {({
                                            getFieldValue,
                                          }) => {
                                            const timeTypeStep =
                                              _.find(
                                                timeTypeMeta,
                                                {
                                                  ObjectUUID:
                                                    getFieldValue(
                                                      [
                                                        field.name,
                                                        'time',
                                                        'type',
                                                      ]
                                                    ),
                                                }
                                              )?.step ??
                                              1;

                                            return (
                                              <Form.Item
                                                className="mb-0"
                                                name={[
                                                  field.name,
                                                  'time',
                                                  'value',
                                                ]}
                                                rules={[
                                                  validation.required(
                                                    t(
                                                      tokens
                                                        .dataBreach
                                                        .task
                                                        .workingPeriodRequired
                                                    )
                                                  ),
                                                ]}
                                              >
                                                <InputNumber
                                                  min={1}
                                                  max={99}
                                                  step={
                                                    timeTypeStep
                                                  }
                                                  className="w-100"
                                                />
                                              </Form.Item>
                                            );
                                          }}
                                        </Form.Item>
                                        <Form.Item
                                          className="mb-0 w-100"
                                          name={[
                                            field.name,
                                            'time',
                                            'type',
                                          ]}
                                          rules={[
                                            validation.required(
                                              t(
                                                tokens
                                                  .dataBreach
                                                  .task
                                                  .workingPeriodRequired
                                              )
                                            ),
                                          ]}
                                        >
                                          <Select
                                            className="w-100"
                                            options={
                                              workflowDurationTypeOptions
                                            }
                                          />
                                        </Form.Item>
                                      </Flex>
                                    </Form.Item>
                                  );
                                }}
                              </Form.Item>
                            </Flex>
                            <Form.Item
                              {...field}
                              label={
                                <IntlMessage
                                  id={
                                    tokens.dataBreach.task
                                      .responsible
                                  }
                                />
                              }
                              name={[
                                field.name,
                                'responsible',
                              ]}
                              rules={[
                                validation.required(
                                  t(
                                    tokens.dataBreach.task
                                      .responsibleRequired
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
                        <IntlMessage
                          id={tokens.common.add}
                        />
                      </Button>
                    </div>
                  );
                }}
              </Form.List>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};
