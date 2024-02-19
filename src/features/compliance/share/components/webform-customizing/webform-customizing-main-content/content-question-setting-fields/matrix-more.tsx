import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
} from 'antd';
import type { FormListFieldData } from 'antd';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';

export type MatrixMoreProps = {
  field: FormListFieldData;
  parentType: 'columns' | 'rows';
};

export type MatrixMoreItemProps = MatrixMoreProps & {
  fields: FormListFieldData[];
  parentField: FormListFieldData;
  add: () => void;
  remove?: (index: number) => void;
};

export const MatrixMoreItem = ({
  field,
  fields,
  parentType,
  parentField,
  add,
  remove,
}: MatrixMoreItemProps) => (
  <Flex justifyContent="between" alignItems="center">
    <div className="w-100 mr-2">
      <Form.Item
        {...field}
        name={[field.name, 'type']}
        rules={[validation.required('ประเภท')]}
      >
        <Select
          className="w-100"
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
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues?.[parentType]?.[parentField?.name]?.[
            'options'
          ]?.[field?.name]?.type !==
          curValues?.[parentType]?.[parentField?.name]?.[
            'options'
          ]?.[field?.name]?.type
        }
      >
        {({ getFieldValue }) => {
          const type = getFieldValue([
            parentType,
            parentField.name,
            'options',
            field.name,
            'type',
          ]);

          if (type === 'attachment') {
            return (
              <Form.Item
                {...field}
                className="mb-2"
                name={[field.name, 'uploadButtonText']}
                rules={[
                  validation.required(
                    'Upload text button'
                  ),
                ]}
              >
                <Input />
              </Form.Item>
            );
          }

          return (
            <Form.Item
              {...field}
              className="mb-2"
              name={[field.name, 'placeholder']}
              rules={[validation.required('Placeholder')]}
            >
              <Input />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Flex justifyContent="between" alignItems="center">
        <Form.Item
          {...field}
          name={[field.name, 'required']}
          valuePropName="checked"
        >
          <Checkbox>ที่จำเป็น</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="link"
            className="p-0"
            hidden={
              field.name !==
                fields[fields.length - 1]?.name &&
              fields.length > 1
            }
            onClick={() => add()}
          >
            เพิ่มคำตอบเพิ่มเติม
          </Button>
        </Form.Item>
      </Flex>
    </div>
    <div>
      <DeleteOutlined
        onClick={() => remove?.(field.name)}
      />
    </div>
  </Flex>
);

export const MatrixMore = ({
  field,
  parentType,
}: MatrixMoreProps) => {
  const parentField = field;

  return (
    <>
      <Form.Item
        {...field}
        name={[field.name, 'isMore']}
        valuePropName="checked"
      >
        <Checkbox>คำตอบเพิ่มเติม</Checkbox>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues?.[parentType]?.[field?.name]
            ?.isMore !==
          curValues?.[parentType]?.[field?.name]?.isMore
        }
      >
        {({ getFieldValue }) => {
          const isMore = getFieldValue([
            parentType,
            field.name,
            'isMore',
          ]);

          if (!isMore) return null;

          return (
            <Form.List name={[field.name, 'options']}>
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.length === 0 && (
                      <MatrixMoreItem
                        field={field}
                        parentField={parentField}
                        fields={fields}
                        parentType={parentType}
                        add={add}
                      />
                    )}
                    {fields.map((field) => (
                      <MatrixMoreItem
                        key={field.key}
                        field={field}
                        parentField={parentField}
                        fields={fields}
                        parentType={parentType}
                        add={add}
                        remove={remove}
                      />
                    ))}
                  </>
                );
              }}
            </Form.List>
          );
        }}
      </Form.Item>
      <Divider />
    </>
  );
};
