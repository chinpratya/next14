import {
  DeleteOutlined,
  EditOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  HistoryOutlined,
  NodeExpandOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { Flex } from '@mantine/core';
import { Tooltip, Typography } from 'antd';

import { RightsStageType } from '../../types';

export type RightsStageItemProps = {
  stage: RightsStageType;
  isCurrent?: boolean;
  isLasted?: boolean;
  onEdit?: (stage: RightsStageType) => void;
  onDelete?: (stage: RightsStageType) => void;
};

const RightsStageItemStyle = styled.div`
  padding-bottom: 24px;

  .text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rights-stage-item__name {
    max-width: calc(100% - 45px);
  }

  .rights-stage-item__action--active {
    .anticon {
      cursor: pointer !important;
    }
  }

  .rights-stage-item__action--inactive {
    pointer-events: none;
  }
`;

export const RightsStageItem = ({
  stage,
  isCurrent,
  isLasted,
  onEdit,
  onDelete,
}: RightsStageItemProps) => {
  const {
    set_start_time,
    auto_complete,
    sent_email_if_start,
    sent_email_if_complete,
  } = stage;

  const isStartTimeClass = set_start_time
    ? 'text-primary'
    : 'text-gray-lighter';

  const isCompleteClass = auto_complete
    ? 'text-primary'
    : 'text-gray-lighter';

  const isSentEmailIfStartClass = sent_email_if_start
    ? 'text-primary'
    : 'text-gray-lighter';

  const isSentEmailIfCompleteClass =
    sent_email_if_complete
      ? 'text-primary'
      : 'text-gray-lighter';

  return (
    <RightsStageItemStyle className="w-100">
      <Flex
        justify="space-between"
        align="center"
        className="w-100"
      >
        <Typography.Text
          className="rights-stage-item__name text-ellipsis"
          type="secondary"
        >
          {stage?.name ?? stage?.stageName}
        </Typography.Text>
        <Flex
          align="center"
          justify="end"
          gap={8}
          className={`rights-stage-item__action ${
            isCurrent
              ? 'rights-stage-item__action--active'
              : 'rights-stage-item__action--inactive'
          }`}
        >
          {onEdit && (
            <EditOutlined
              className="text-gray-lighter"
              onClick={() => onEdit?.(stage)}
            />
          )}
          {onDelete && (
            <DeleteOutlined
              className="text-gray-lighter"
              onClick={() => onDelete?.(stage)}
            />
          )}
        </Flex>
      </Flex>
      <Flex
        justify="start"
        align="center"
        className="w-100"
        gap={10}
      >
        {!isLasted && (
          <>
            <Tooltip title="เริ่มนับเวลาคำขอหลังจากเสร็จขั้นตอนนี้">
              <HistoryOutlined
                className={isStartTimeClass}
              />
            </Tooltip>
            <Tooltip title="เปลี่ยนขั้นตอนการทำงานอัตโนมัติเมื่องานที่จำเป็นทั้งหมดเสร็จสิ้น">
              <NodeExpandOutlined
                className={isCompleteClass}
              />
            </Tooltip>
          </>
        )}
        <Tooltip title="ส่งการแจ้งเตือนให้เจ้าของข้อมูลทราบเมื่อถึงขั้นตอนนี้">
          <FileSyncOutlined
            className={isSentEmailIfStartClass}
          />
        </Tooltip>
        <Tooltip title="ส่งการแจ้งเตือนให้เจ้าของข้อมูลทราบเมื่อขั้นตอนนี้เสร็จสิ้น">
          <FileProtectOutlined
            className={isSentEmailIfCompleteClass}
          />
        </Tooltip>
        {isLasted && (
          <Tooltip title="อนุญาตให้คำขอเสร็จอัตโนมัติเมื่องานที่จำเป็นทั้งหมดเสร็จสิ้นในขั้นตอนสุดท้าย">
            <ScheduleOutlined
              className={isCompleteClass}
            />
          </Tooltip>
        )}
      </Flex>
    </RightsStageItemStyle>
  );
};
