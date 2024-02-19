import {
  CopyOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import type { FormListFieldData } from 'antd';

import { Flex } from '@components/flex';

export type PositionOptionsProps = {
  field: FormListFieldData;
  fields: FormListFieldData[];
  onDuplicate?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
};

export const PositionOptions = ({
  field,
  fields,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: PositionOptionsProps) => {
  return (
    <Flex justifyContent="end" className="mb-2">
      <CopyOutlined
        onClick={() => onDuplicate?.(field.name)}
        className="mr-2"
      />
      <UpCircleOutlined
        onClick={() => onMoveUp?.(field.name)}
        className="mr-2"
        hidden={field.name === 0}
      />
      <DownCircleOutlined
        onClick={() => onMoveDown?.(field.name)}
        className="mr-2"
        hidden={field.name === fields.length - 1}
      />
      <DeleteOutlined
        onClick={() => onRemove?.(field.name)}
      />
    </Flex>
  );
};
