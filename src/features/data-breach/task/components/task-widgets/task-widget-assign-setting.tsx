import {
  ExceptionOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  FileTextOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Collapse,
  Form,
  Switch,
  Tooltip,
  Typography,
} from 'antd';

import { tokens } from '@/lang';
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
              title={
                <IntlMessage
                  id={
                    tokens.dataBreach.task
                      .settingTaskTooltip
                  }
                />
              }
              placement="topLeft"
            >
              <IntlMessage
                id={tokens.dataBreach.task.settingTask}
              />
            </Tooltip>
          }
          key="settingTask"
        >
          <Flex direction="column" gap={25}>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileTextOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage
                  id={tokens.dataBreach.task.requiredJob}
                />
              </Typography.Text>
              <Form.Item
                name="requiredJob"
                valuePropName="checked"
                noStyle
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
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileExclamationOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage
                  id={tokens.dataBreach.task.identifyTask}
                />
              </Typography.Text>
              <Form.Item
                name="IdentifyTask"
                valuePropName="checked"
                noStyle
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
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <FileDoneOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage
                  id={
                    tokens.dataBreach.task
                      .resolutionCloseJob
                  }
                />
              </Typography.Text>
              <Form.Item
                name="resolutionCloseJob"
                valuePropName="checked"
                noStyle
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
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <ExceptionOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage
                  id={
                    tokens.dataBreach.task
                      .resolutionEndJob
                  }
                />
              </Typography.Text>
              <Form.Item
                name="resolutionEndJob"
                valuePropName="checked"
                noStyle
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
            </Flex>
            <Flex align="center" justify="space-between">
              <Typography.Text>
                <PullRequestOutlined className="text-primary font-size-md mr-2" />
                <IntlMessage
                  id={
                    tokens.dataBreach.task.isCloseIfReject
                  }
                />
              </Typography.Text>
              <Form.Item
                name="isCloseIfReject"
                valuePropName="checked"
                noStyle
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
            </Flex>
          </Flex>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
