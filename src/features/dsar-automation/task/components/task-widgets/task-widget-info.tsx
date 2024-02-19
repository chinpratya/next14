import { Flex } from '@mantine/core';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserSelect } from '../../../../admin';
import { useListWorkflowUser } from '../../../workflow';

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
            <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'dsarAutomation.request.detail.task.assign.basicInfo.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Flex
          align="center"
          justify="start"
          className="mr-4"
          gap={24}
        >
          <Form.Item
            label={
              <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.priority" />
            }
            name="priority"
            className="w-50"
            rules={[
              validation.required(
                t(
                  'dsarAutomation.request.detail.task.assign.basicInfo.priorityRequired'
                )
              ),
            ]}
          >
            <Select
              options={priorityOptions}
              className="w-75"
            />
          </Form.Item>
          <Flex
            align="center"
            gap={8}
            style={{ marginTop: 30 }}
            className="w-50"
          >
            <Typography.Text className="mb-4">
              <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.endDate" />{' '}
              :
            </Typography.Text>
            <Form.Item
              name="endDate"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.request.detail.task.assign.basicInfo.endDateRequired'
                  )
                ),
              ]}
            >
              <InputNumber
                min={1}
                max={365}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Typography.Text className="mb-4">
              <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.day" />
            </Typography.Text>
          </Flex>
        </Flex>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.delegate" />
          }
          name="delegateID"
          rules={[
            validation.required(
              t(
                'dsarAutomation.request.detail.task.assign.basicInfo.delegateRequired'
              )
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
            <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.description" />
          }
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </div>
    </div>
  );
};
