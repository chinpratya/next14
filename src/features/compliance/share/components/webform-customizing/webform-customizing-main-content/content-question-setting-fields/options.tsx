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
  FormInstance,
  FormListFieldData,
  Input,
  Select,
  Typography,
} from 'antd';

import validation from '@/utils/validation';
import { DragLeftWrapper } from '@components/drag-left-wrapper';
import { Flex } from '@components/flex';

import { useAaWebform } from '../../../../hooks/use-aa-webform';

import { PositionOptions } from './position-options';

export type OptionsProps = {
  form: FormInstance;
};

export type OptionItemProps = {
  field: FormListFieldData;
  fields: FormListFieldData[];
  onDuplicate?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
};

export const OptionItem = ({
  field,
  fields,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: OptionItemProps) => {
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
      </Flex>
      <Form.Item
        {...field}
        name={[field.name, 'title']}
        className="mb-2"
        rules={[validation.required('หัวข้อ')]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'isMore']}
        className="mb-2"
        valuePropName="checked"
      >
        <Checkbox>คำตอบเพิ่มเติม</Checkbox>
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const isMore = getFieldValue([
            'options',
            field.name,
            'isMore',
          ]);

          if (!isMore) return null;

          return (
            <Form.Item
              {...field}
              name={[field.name, 'type']}
              className="mb-2"
              rules={[validation.required('ประเภท')]}
            >
              <Select
                options={[
                  {
                    label: 'Input',
                    value: 'input',
                  },
                  {
                    label: 'Attachment',
                    value: 'attachment',
                  },
                ]}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const isMore = getFieldValue([
            'options',
            field.name,
            'isMore',
          ]);
          const type = getFieldValue([
            'options',
            field.name,
            'type',
          ]);

          if (type !== 'input' || !isMore) return null;

          return (
            <Form.Item
              {...field}
              name={[field.name, 'placeholder']}
              className="mb-2"
              rules={[validation.required('ข้อความปุ่ม')]}
            >
              <Input />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Divider className="mt-0 mb-4" />
    </DragLeftWrapper>
  );
};

export const OptionList = ({ form }: OptionsProps) => {
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
            <Form.List name="options">
              {(fields, { add, move, remove }) => {
                const onDuplicate = (index: number) => {
                  const options =
                    form.getFieldValue('options');
                  add(options[index]);
                };

                return (
                  <>
                    {fields?.length === 0 && (
                      <Empty className="mb-4" />
                    )}
                    <div
                      style={{
                        minHeight: fields.length * 143,
                      }}
                    >
                      {fields?.map(
                        (field, index, fields) => (
                          <OptionItem
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

export const Options = ({ form }: OptionsProps) => {
  return (
    <>
      <Typography.Title level={4}>
        ตัวเลือก
      </Typography.Title>
      <OptionList form={form} />
    </>
  );
};
