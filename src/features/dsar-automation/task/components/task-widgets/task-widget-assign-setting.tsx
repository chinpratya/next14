import {
  ExceptionOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Collapse,
  Form,
  Input,
  Switch,
  Tooltip,
  Typography,
} from 'antd';

import { validation } from '@/utils';
import { FileUserIconOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

export type TaskWidgetAssignSettingProps = {
  readOnly?: boolean;
};

export const TaskWidgetAssignSetting = ({
  readOnly,
}: TaskWidgetAssignSettingProps) => {
  return (
    <div
      style={{
        cursor: readOnly ? 'not-allowed' : 'auto',
      }}
    >
      <Collapse
        defaultActiveKey={['settingTask']}
        style={{
          pointerEvents: readOnly ? 'none' : 'auto',
        }}
      >
        <Collapse.Panel
          header={
            <Tooltip
              title="จำเป็นจะต้องทำงานนี้ให้เสร็จก่อนถึงจะสามารถเปลี่ยนขั้นตอนได้"
              placement="topLeft"
            >
              <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.setting" />
            </Tooltip>
          }
          key="settingTask"
        >
          <Flex
            direction="column"
            gap={18}
            style={{
              paddingBottom: 100,
            }}
          >
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileTextOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.requiredJob" />
              </Typography.Text>
              <Form.Item
                name="requiredJob"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileUserIconOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.identifyTask" />
              </Typography.Text>
              <Form.Item
                name="IdentifyTask"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileDoneOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.resolutionCloseJob" />
              </Typography.Text>
              <Form.Item
                name="resolutionCloseJob"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <ExceptionOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.resolutionEndJob" />
              </Typography.Text>
              <Form.Item
                name="resolutionEndJob"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <PullRequestOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.isCloseIfReject" />
              </Typography.Text>
              <Form.Item
                name="isCloseIfReject"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileUserIconOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.isReject" />
              </Typography.Text>
              <Form.Item
                name="isReject"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.off" />
                  }
                />
              </Form.Item>
            </Flex>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.isReject !==
                currentValues.isReject
              }
            >
              {({ getFieldValue }) => {
                if (!getFieldValue('isReject')) {
                  return null;
                }

                return (
                  <Form.Item
                    label={
                      <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.rejectMassage.title" />
                    }
                    name="rejectMassage"
                    tooltip={
                      <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.rejectMassage.tooltip" />
                    }
                    rules={[
                      validation.required(
                        'กรุณากรอกข้อความ'
                      ),
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Flex>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
