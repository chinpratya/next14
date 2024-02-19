import {
  DeleteOutlined,
  EditOutlined,
  ExceptionOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Badge,
  Divider,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import _ from 'lodash';

import {
  GREY_PRIMARY_COLOR,
  PROCESSING_COLOR,
  RED_PRIMARY_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagStatus } from '@components/show-tag-status';
import {
  APIIconOutlined,
  FileUserIconOutlined,
} from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { Task } from '../../types';

export type UseTaskListRenders<T> = {
  rowKey?: string;
  onEdit?: (task: T) => void;
  onDelete?: (task: T) => void;
};

export const useTaskListRenders = <T,>({
  rowKey = 'workID',
  onEdit,
  onDelete,
}: UseTaskListRenders<T>) => {
  const taskIdRender = (task: T) => (
    <Typography.Link onClick={() => onEdit?.(task)}>
      {_.get(task, rowKey) as string}
    </Typography.Link>
  );

  const getIconClassname = (active: boolean) =>
    active ? 'text-primary' : 'text-gray-light';

  const priorityRender = (priority: string) => {
    return {
      high: (
        <Tag className="text-capitalize" color="error">
          <IntlMessage id={tokens.common.priority.high} />
        </Tag>
      ),
      medium: (
        <Tag className="text-capitalize" color="warning">
          <IntlMessage
            id={tokens.common.priority.medium}
          />
        </Tag>
      ),
      low: (
        <Tag className="text-capitalize" color="success">
          <IntlMessage id={tokens.common.priority.low} />
        </Tag>
      ),
    }[priority];
  };

  const assignedRender = (assignees: string[]) =>
    assignees?.join(', ');

  const endDateRender = ({
    timeReminded,
    isOvertime,
  }: Task) => {
    const OvertimeLabel = () =>
      isOvertime ? (
        <Tag color="error">
          <Badge
            status="error"
            text={
              <IntlMessage
                id={tokens.common.overtime.over}
              />
            }
          />
        </Tag>
      ) : (
        <Tag color="success">
          <Badge
            status="success"
            text={
              <IntlMessage
                id={tokens.common.overtime.within}
              />
            }
          />
        </Tag>
      );

    return (
      <Flex align="center">
        <div
          style={{
            width: 200,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {timeReminded}
        </div>
        <Divider
          type="vertical"
          style={{
            height: 20,
          }}
        />
        <OvertimeLabel />
      </Flex>
    );
  };

  const statusRender = (status: string) => (
    <ShowTagStatus
      status={status}
      bordered={false}
      items={[
        {
          label: tokens.common.status.open,
          key: 'open',
          color: GREY_PRIMARY_COLOR,
        },
        {
          label: tokens.common.status.inProgress,
          key: 'in_progress',
          color: PROCESSING_COLOR,
        },
        {
          label: tokens.common.status.close,
          key: 'close',
          color: SUCCESS_COLOR,
        },
        {
          label: tokens.common.status.reject,
          key: 'reject',
          color: RED_PRIMARY_COLOR,
        },
      ]}
    />
  );

  const conditionRender = (task: T) => (
    <Flex
      justify="center"
      align="center"
      className="w-100"
      gap={10}
    >
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.requiredJob" />
        }
      >
        <FileTextOutlined
          className={getIconClassname(
            _.get(task, 'requiredJob', false) as boolean
          )}
        />
      </Tooltip>
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.identifyTask" />
        }
      >
        <FileUserIconOutlined
          className={getIconClassname(
            _.get(task, 'IdentifyTask', false) as boolean
          )}
        />
      </Tooltip>
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.resolutionCloseJob" />
        }
      >
        <FileDoneOutlined
          className={getIconClassname(
            _.get(
              task,
              'resolutionCloseJob',
              false
            ) as boolean
          )}
        />
      </Tooltip>
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.resolutionEndJob" />
        }
      >
        <ExceptionOutlined
          className={getIconClassname(
            _.get(
              task,
              'resolutionEndJob',
              false
            ) as boolean
          )}
        />
      </Tooltip>
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.isCloseIfReject" />
        }
      >
        <PullRequestOutlined
          className={getIconClassname(
            _.get(
              task,
              'isCloseIfReject',
              false
            ) as boolean
          )}
        />
      </Tooltip>
      <Tooltip
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.assign.api.desc" />
        }
      >
        <APIIconOutlined
          className={getIconClassname(
            _.get(task, 'isAPI', false) as boolean
          )}
        />
      </Tooltip>
    </Flex>
  );

  const actionDropdownRender = (task: T) => (
    <DropdownTable
      items={[
        {
          key: 'edit',
          label: <IntlMessage id={tokens.common.edit} />,
          icon: <EditOutlined />,
          onClick: () => onEdit?.(task),
        },
        {
          key: 'delete',
          label: (
            <IntlMessage id={tokens.common.delete} />
          ),
          icon: <DeleteOutlined />,
          onClick: () => onDelete?.(task),
        },
      ]}
    />
  );

  const eyeViewRender = (task: T) => (
    <EyeOutlined onClick={() => onEdit?.(task)} />
  );

  return {
    taskIdRender,
    priorityRender,
    assignedRender,
    endDateRender,
    statusRender,
    conditionRender,
    actionDropdownRender,
    eyeViewRender,
  };
};
