import { Flex } from '@mantine/core';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserSelect } from '../../../../admin';
import {
  useListWorkflowUser,
  useGetWorkflowMeta,
} from '../../../workflow';

export type TaskWidgetInfoProps = {
  workflowId?: string;
  readOnly?: boolean;
};

const priorityOptions = [
  {
    label: (
      <Tag color="red">
        <IntlMessage id={tokens.common.priority.high} />
      </Tag>
    ),
    value: 'high',
  },
  {
    label: (
      <Tag color="yellow">
        <IntlMessage id={tokens.common.priority.medium} />
      </Tag>
    ),
    value: 'medium',
  },
  {
    label: (
      <Tag color="green">
        <IntlMessage id={tokens.common.priority.low} />
      </Tag>
    ),
    value: 'low',
  },
];

export const TaskWidgetInfo = ({
  workflowId,
  readOnly,
}: TaskWidgetInfoProps) => {
  const { t } = useTranslation();
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

  return (
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
          label={
            <IntlMessage
              id={tokens.dataBreach.task.taskName}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(tokens.dataBreach.task.taskNameRequired)
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Flex align="center" justify="start" gap={12}>
          <Form.Item
            label={
              <IntlMessage
                id={tokens.dataBreach.task.priority}
              />
            }
            name="priority"
            className="w-50"
            rules={[
              validation.required(
                t(tokens.dataBreach.task.priorityRequired)
              ),
            ]}
          >
            <Select
              options={priorityOptions}
              className="w-100"
            />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage
                id={tokens.dataBreach.task.workingPeriod}
              />
            }
            className="w-50"
            required
          >
            <Flex gap={8}>
              <Form.Item
                shouldUpdate={(prevValues, nextValues) =>
                  prevValues?.endDate?.type !==
                  nextValues?.endDate?.type
                }
                className="w-100 mb-0"
              >
                {({ getFieldValue }) => {
                  const timeTypeStep =
                    _.find(timeTypeMeta, {
                      ObjectUUID: getFieldValue([
                        'endDate',
                        'type',
                      ]),
                    })?.step ?? 1;

                  return (
                    <Form.Item
                      className="mb-0"
                      name={['endDate', 'value']}
                      rules={[
                        validation.required(
                          t(
                            tokens.dataBreach.task
                              .workingPeriodRequired
                          )
                        ),
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={99}
                        step={timeTypeStep}
                        className="w-100"
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <Form.Item
                className="mb-0 w-100"
                name={['endDate', 'type']}
                rules={[
                  validation.required(
                    t(
                      tokens.dataBreach.task
                        .workingPeriodRequired
                    )
                  ),
                ]}
              >
                <Select
                  className="w-100"
                  options={workflowDurationTypeOptions}
                />
              </Form.Item>
            </Flex>
          </Form.Item>
        </Flex>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.task.delegate}
            />
          }
          name="delegateID"
          rules={[
            validation.required(
              t(tokens.dataBreach.task.delegateRequired)
            ),
          ]}
        >
          {workflowId ? (
            <Select
              mode="multiple"
              options={delegateOptions}
              showSearch
              optionFilterProp="label"
              loading={workflowUser.isLoading}
            />
          ) : (
            <UserSelect mode="multiple" />
          )}
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.task.description}
            />
          }
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </div>
    </div>
  );
};
