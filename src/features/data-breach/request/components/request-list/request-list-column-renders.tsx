import { EyeOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Badge, Divider, Tag, Typography } from 'antd';

import { tokens } from '@/lang';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { Request } from '../../types';
import { RequestStatus } from '../request-status';

export const requestIdRender = (
  onEdit?: (request: Request) => void
) => {
  const Component = (request: Request) => (
    <Typography.Link onClick={() => onEdit?.(request)}>
      {request.requestID}
    </Typography.Link>
  );
  Component.displayName = 'RequestIdRender';
  return Component;
};

export const columnStatusRender = (status: string) => (
  <RequestStatus status={status} />
);

export const workflowRender = (workflowName: string) => (
  <Tag className="w-100 overflow-hidden segmented-text-ellipsis">
    {workflowName}
  </Tag>
);

export const endDateRender = ({
  timeReminded,
  isOvertime,
}: Request) => {
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

export const tagRender = (tagName: string[]) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
      }}
    >
      {tagName.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
};

export const numberOfEndRender = (
  value: number,
  type: string
) => `${value} ${type}`;

export const actionRender = ({
  onEdit,
  onClose,
  onReject,
  permissionReject = false,
  permissionClose = false,
  permissionEdit = false,
}: {
  onEdit: (request: Request) => void;
  onClose: (request: Request) => void;
  onReject: (request: Request) => void;
  permissionReject?: boolean;
  permissionClose?: boolean;
  permissionEdit?: boolean;
}) => {
  const Component = (request: Request) => {
    const isEditenable = ['close', 'reject'].includes(
      request?.requestStatus?.toLowerCase() as string
    );

    return (
      <DropdownTable
        items={[
          {
            key: 'edit',
            label: (
              <IntlMessage id={tokens.common.edit} />
            ),
            icon: <EyeOutlined />,
            onClick: () => onEdit(request),
            disabled: permissionEdit,
          },
          {
            key: 'divider',
            type: 'divider',
          },
          {
            key: 'close',
            label: (
              <IntlMessage id={tokens.common.close} />
            ),
            disabled: isEditenable || permissionClose,
            onClick: () => onClose(request),
          },
          {
            key: 'reject',
            label: (
              <IntlMessage
                id={tokens.common.status.reject}
              />
            ),
            disabled: isEditenable || permissionReject,
            onClick: () => onReject(request),
          },
        ]}
      />
    );
  };
  Component.displayName = 'ActionRender';
  return Component;
};
