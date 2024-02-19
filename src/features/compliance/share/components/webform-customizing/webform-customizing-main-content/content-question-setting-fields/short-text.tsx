import { PlusOutlined } from '@ant-design/icons';
import {
  DragDropContext,
  Droppable,
} from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import {
  Button,
  Checkbox,
  Divider,
  Empty,
  Form,
  Input,
  Typography,
} from 'antd';
import type {
  FormListFieldData,
  FormInstance,
} from 'antd';

import validation from '@/utils/validation';
import { DragLeftWrapper } from '@components/drag-left-wrapper';
import { Flex } from '@components/flex';

import { useAaWebform } from '../../../../hooks/use-aa-webform';

import { PositionOptions } from './position-options';

type LongTextMessageItemProps = {
  field: FormListFieldData;
  fields: FormListFieldData[];
  onDuplicate?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
};

const ShortTextItem = ({
  field,
  fields,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: LongTextMessageItemProps) => {
  return (
    <DragLeftWrapper
      key={field.name}
      draggableId={field.name.toString()}
      index={field.name}
    >
      <Flex flexDirection="column">
        <PositionOptions
          field={field}
          fields={fields}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
        <Form.Item
          {...field}
          key={field.key}
          name={[field.name, 'title']}
          className="mb-2"
          rules={[validation.required('ข้อความ')]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...field}
          key={field.key}
          name={[field.name, 'placeholder']}
          className="mb-2"
          rules={[validation.required('คำอธิบาย')]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...field}
          key={field.key}
          name={[field.name, 'attachment']}
          className="mb-2"
          valuePropName="checked"
        >
          <Checkbox>แนบหลักฐานเพิ่มเติม</Checkbox>
        </Form.Item>
        <Divider className="mt-0 mb-4" />
      </Flex>
    </DragLeftWrapper>
  );
};

export type LongTextMessageListProps = {
  form: FormInstance;
};

export const ShortTextList = ({
  form,
}: LongTextMessageListProps) => {
  const { onDragEnd } = useAaWebform({});

  return (
    <DragDropContext
      onDragEnd={(result: DropResult) =>
        onDragEnd(result, form)
      }
    >
      <Droppable droppableId="message-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Form.List name={['options']}>
              {(fields, { add, remove, move }) => {
                const onDuplicate = (index: number) => {
                  const options =
                    form.getFieldValue('options');
                  add(options[index]);
                };

                return (
                  <>
                    {fields.length === 0 && (
                      <Empty className="mb-4" />
                    )}
                    <div
                      style={{
                        minHeight: fields.length * 191,
                      }}
                    >
                      {fields.map(
                        (field, index, fields) => (
                          <ShortTextItem
                            key={field.key}
                            field={field}
                            fields={fields}
                            onRemove={remove}
                            onDuplicate={() =>
                              onDuplicate(field.name)
                            }
                            onMoveUp={() =>
                              move(
                                field.name,
                                field.name - 1
                              )
                            }
                            onMoveDown={() =>
                              move(
                                field.name,
                                field.name + 1
                              )
                            }
                          />
                        )
                      )}
                    </div>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        เพิ่ม
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export type LongTextMessageProps =
  LongTextMessageListProps;

export const ShortText = ({
  form,
}: LongTextMessageProps) => {
  return (
    <>
      <Typography.Title level={4}>
        ข้อความสั้น
      </Typography.Title>
      <ShortTextList form={form} />
    </>
  );
};
