import {
  HolderOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Draggable } from '@hello-pangea/dnd';
import type { DraggableProps } from '@hello-pangea/dnd';

export type DragFieldProps = Omit<
  DraggableProps,
  'children'
> & {
  label: string;
  isAddDisabled?: boolean;
  onAdd?: (draggableId: string) => void;
  isDeleteDisabled?: boolean;
  onDelete?: (draggableId: string) => void;
};

export const DragField = ({
  label,
  isAddDisabled,
  onAdd,
  isDeleteDisabled,
  onDelete,
  isDragDisabled,
  ...draggableProps
}: DragFieldProps) => {
  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      {...draggableProps}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="border border-gray-300 mb-2 d-flex align-items-center justify-content-between"
            style={{
              borderRadius: 10,
              padding: 12,
              background: isDragDisabled
                ? '#f5f5f5'
                : '#fff',
              cursor: isDragDisabled
                ? 'not-allowed'
                : 'grab',
            }}
          >
            <HolderOutlined className="mr-2" />
            <span className="w-100">{label}</span>
            <div>
              {onAdd && !isAddDisabled && (
                <PlusCircleOutlined
                  className="ml-2 cursor-pointer"
                  onClick={() =>
                    onAdd(draggableProps.draggableId)
                  }
                />
              )}
              {onDelete && !isDeleteDisabled && (
                <MinusCircleOutlined
                  className="ml-2 cursor-pointer"
                  onClick={() =>
                    onDelete(draggableProps.draggableId)
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
