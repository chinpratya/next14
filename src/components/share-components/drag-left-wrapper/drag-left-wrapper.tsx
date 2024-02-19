import { HolderOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

export type DragLeftWrapperProps = {
  draggableId: string;
  index: number;
  children: React.ReactNode;
};

export const DragLeftWrapper = ({
  children,
  draggableId,
  index,
}: DragLeftWrapperProps) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={
            snapshot.isDragging
              ? {
                  ...provided.draggableProps.style,
                  background: '#fff',
                  padding: '8px 16px',
                  borderRadius: '0.25rem',
                }
              : provided.draggableProps.style
          }
        >
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              margin-left: -24px;

              .drag-left-wrapper-children {
                width: 100%;
                margin-right: -24px;
              }
            `}
          >
            <div className="h-100">
              <HolderOutlined
                className="mr-2"
                style={{ cursor: 'grab', color: '#999' }}
              />
            </div>
            <div className="drag-left-wrapper-children">
              {children}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
