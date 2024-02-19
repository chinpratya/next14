import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  HolderOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Draggable } from '@hello-pangea/dnd';
import type { DraggableProps } from '@hello-pangea/dnd';
import { Flex } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import React from 'react';

export type DragContentProps = Omit<
  DraggableProps,
  'children'
> & {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onSetting?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  total?: number;
  isDisabledDelete?: boolean;
  isDisabledSetting?: boolean;
};

const dragHandleStyle = {
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
  padding: '10px',
  border: '1px solid #e6ebf1',
};

export const DragContent = ({
  children,
  disabled,
  total = 9999,
  onMoveUp,
  onMoveDown,
  onDelete,
  onSetting,
  isDisabledDelete,
  isDisabledSetting,
  ...draggableProps
}: DragContentProps) => {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      <Draggable {...draggableProps}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={
                snapshot.isDragging ? dragHandleStyle : {}
              }
            >
              <Flex
                justify="space-between"
                align="center"
                style={{
                  marginBottom: '10px',
                  height: '31px',
                }}
              >
                {hovered && !disabled && (
                  <>
                    <div></div>
                    <HolderOutlined />
                    <div>
                      {onMoveUp &&
                        draggableProps.index > 0 && (
                          <CaretUpOutlined
                            className="ml-2"
                            onClick={onMoveUp}
                          />
                        )}
                      {onMoveDown &&
                        draggableProps.index + 1 <
                          total && (
                          <CaretDownOutlined
                            className="ml-2"
                            onClick={onMoveDown}
                          />
                        )}
                      {onSetting &&
                        !isDisabledSetting && (
                          <SettingOutlined
                            className="ml-2"
                            onClick={onSetting}
                          />
                        )}
                      {onDelete && !isDisabledDelete && (
                        <CloseOutlined
                          className="ml-2"
                          onClick={onDelete}
                        />
                      )}
                    </div>
                  </>
                )}
              </Flex>
              {children}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};
