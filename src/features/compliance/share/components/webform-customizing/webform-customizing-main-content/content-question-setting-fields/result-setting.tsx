import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  DragDropContext,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Empty,
  Form,
  FormInstance,
  FormListFieldData,
  Input,
  Select,
} from 'antd';

import validation from '@/utils/validation';
import { DragLeftWrapper } from '@components/drag-left-wrapper';
import { Flex } from '@components/flex';

import { useAaWebform } from '../../../../hooks/use-aa-webform';
import { useAaWebformStore } from '../../../../stores/use-aa-webform-store';
import { WebformBuilderLongTextOption } from '../../../../types/webform-builder';

import { PositionOptions } from './position-options';

export type ResultSettingItemProps = {
  field: FormListFieldData;
  fields: FormListFieldData[];
  index: number;
  onDuplicate?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
};

export type ResultSettingFormProps = {
  name: number;
  form: FormInstance;
};

export type ResultSettingProps = {
  form: FormInstance;
  dependencyKey?: string;
};

export const ResultSettingItem = ({
  field,
  fields,
  index,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: ResultSettingItemProps) => {
  return (
    <DragLeftWrapper
      draggableId={`${index}-${field.name}`}
      index={field.name}
    >
      <PositionOptions
        field={field}
        fields={fields}
        onDuplicate={onDuplicate}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
      <Form.Item
        name={[field.name, 'type']}
        rules={[validation.required('ประเภท')]}
        className="mb-2"
      >
        <Select
          options={[
            {
              label: 'ข้อความ',
              value: 'input',
            },
            {
              label: 'ปรนัยหนึ่งตัวเลือก',
              value: 'radio',
            },
            {
              label: 'ปรนัยหลายตัวเลือก',
              value: 'checkbox',
            },
            {
              label: 'อัปโหลดไฟล์',
              value: 'attachment',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => {
          const prevType =
            prevValues?.options?.[index]?.[field.name]
              ?.type;
          const curType =
            curValues?.options?.[index]?.[field.name]
              ?.type;
          return prevType !== curType;
        }}
      >
        {({ getFieldValue }) => {
          const type = getFieldValue([
            'options',
            index,
            field.name,
            'type',
          ]);

          if (['input', 'attachment'].includes(type)) {
            return (
              <Form.Item
                name={[field.name, 'placeholder']}
                className="mb-2"
              >
                <Input />
              </Form.Item>
            );
          }

          return null;
        }}
      </Form.Item>
      <Form.Item
        name={[field.name, 'required']}
        valuePropName="checked"
        className="mb-2"
      >
        <Checkbox>ที่จำเป็น</Checkbox>
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, curValues) => {
          const prevType =
            prevValues?.options?.[index]?.[field.name]
              ?.type;
          const curType =
            curValues?.options?.[index]?.[field.name]
              ?.type;
          return prevType !== curType;
        }}
        noStyle
      >
        {({ getFieldValue }) => {
          const type = getFieldValue([
            'options',
            index,
            field.name,
            'type',
          ]);

          if (['radio', 'checkbox'].includes(type))
            return (
              <Form.List name={[field.name, 'options']}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.length === 0 && (
                      <Empty className="mb-4" />
                    )}
                    {fields.map((field) => (
                      <Flex
                        key={field.name}
                        justifyContent="between"
                        alignItems="center"
                      >
                        <Form.Item
                          className="mb-2 w-100"
                          name={field.name}
                          rules={[
                            validation.required(
                              'ตัวเลือก'
                            ),
                          ]}
                        >
                          <Input className="w-100" />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() =>
                            remove(field.name)
                          }
                          className="ml-2 mb-2 font-size-md"
                        />
                      </Flex>
                    ))}
                    <Form.Item>
                      <Button
                        block
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        เพิ่ม
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            );

          return null;
        }}
      </Form.Item>
      <Divider />
    </DragLeftWrapper>
  );
};

export const ResultSettingForm = ({
  name,
  form,
}: ResultSettingFormProps) => {
  return (
    <Droppable droppableId={name.toString()}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Form.List name={[name]}>
            {(fields, { add, remove, move }) => {
              const onDuplicate = (index: number) => {
                const duplicateData = form.getFieldValue([
                  'options',
                  name,
                  index,
                ]);

                add(duplicateData);
              };

              return (
                <>
                  {fields.length === 0 && (
                    <Empty className="mb-4" />
                  )}
                  <div
                    style={{
                      minHeight: snapshot.isDraggingOver
                        ? '100vh'
                        : 0,
                    }}
                  >
                    {fields.map((field) => (
                      <ResultSettingItem
                        key={field.name}
                        index={name}
                        field={field}
                        fields={fields}
                        onDuplicate={onDuplicate}
                        onRemove={(index) =>
                          remove(fields[index].name)
                        }
                        onMoveUp={(index) =>
                          move(
                            fields[index].name,
                            fields[index].name - 1
                          )
                        }
                        onMoveDown={(index) =>
                          move(
                            fields[index].name,
                            fields[index].name + 1
                          )
                        }
                      />
                    ))}
                  </div>
                  <Form.Item noStyle>
                    <Button
                      block
                      type="dashed"
                      onClick={() => add()}
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
  );
};

export const ResultSetting = ({
  dependencyKey,
  form,
}: ResultSettingProps) => {
  const { webformBuilderItems } = useAaWebformStore();
  const { getWebformBuilderItem } = useAaWebform({
    webformBuilderItems,
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const newItems = { ...form.getFieldsValue() };

    if (source.droppableId === destination.droppableId) {
      const sourceOptions =
        newItems.options[parseInt(source.droppableId)];

      const [removed] = sourceOptions.splice(
        sourceIndex,
        1
      );

      sourceOptions.splice(destinationIndex, 0, removed);

      newItems.options[parseInt(source.droppableId)] =
        sourceOptions;

      form.setFieldsValue(newItems);
    }
  };

  if (!dependencyKey) return null;

  const dependencyField =
    getWebformBuilderItem(dependencyKey);

  if (!dependencyField) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Form.List name={['options']}>
        {() => (
          <Collapse
            className="collapse-inner"
            defaultActiveKey={dependencyField?.options?.map(
              (
                option: WebformBuilderLongTextOption,
                index
              ) => `dependency-option-${index}`
            )}
          >
            {dependencyField?.options?.map(
              (
                option: WebformBuilderLongTextOption,
                index
              ) => (
                <Collapse.Panel
                  key={`dependency-option-${index}`}
                  header={option.title}
                >
                  <ResultSettingForm
                    name={index}
                    form={form}
                  />
                </Collapse.Panel>
              )
            )}
          </Collapse>
        )}
      </Form.List>
    </DragDropContext>
  );
};
