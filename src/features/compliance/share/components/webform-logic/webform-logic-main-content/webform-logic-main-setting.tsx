import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Empty,
  Form,
  Row,
  Select,
  Typography,
} from 'antd';
import { useState } from 'react';

import { fieldsInfo } from '@/config/fields';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';

import {
  WebformBuilderItem,
  WebformBuilderWidget,
} from '../../../types/webform-builder';

export type WebformLogicMainSettingProps = {
  selectedLogicItem?: WebformBuilderItem;
  onToggleLogic: () => void;
  fields?: WebformBuilderItem[];
};

export type WidgetAliasTagProps = {
  widget: WebformBuilderWidget;
  alias: string;
};

const WidgetAliasTag = ({
  widget,
  alias,
}: WidgetAliasTagProps) => (
  <span
    style={{
      backgroundColor: fieldsInfo[widget].color,
      borderRadius: 8,
      minWidth: 80,
    }}
    className="ml-2 p-1 d-flex align-items-center text-uppercase"
  >
    {fieldsInfo[widget].icon}
    <Typography.Title level={4} className="ml-1 mb-0">
      {alias}
    </Typography.Title>
  </span>
);

export const WebformLogicMainSetting = ({
  selectedLogicItem,
  onToggleLogic,
  fields = [],
}: WebformLogicMainSettingProps) => {
  const [collapseKeys, setCollapseKeys] = useState<
    string[]
  >(['0']);

  const logicFields = fields || [];

  const onCollapseChange = (keys: string | string[]) => {
    setCollapseKeys(
      typeof keys === 'string' ? [keys] : keys
    );
  };

  if (!selectedLogicItem) {
    return null;
  }

  const logicFieldsOptions = fields?.map((field) => ({
    label: (
      <Flex alignItems="center">
        <WidgetAliasTag
          widget={field.widget}
          alias={field?.alias ?? ''}
        />
        <Typography.Text className="ml-2">
          {field.title}
        </Typography.Text>
      </Flex>
    ),
    value: field.key,
  }));

  return (
    <Form
      layout="vertical"
      className={css`
        .ant-collapse {
          .ant-collapse-item {
          }
        }
      `}
      onValuesChange={(changedValues, values) => {
        console.log('changedValues', changedValues);
        console.log('values', values);
      }}
    >
      <div className="pt-3 pb-3 pl-3 pr-2 border-bottom">
        <Flex
          justifyContent="between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <Typography.Title level={3} className="mb-0">
              แก้ไข Logic
            </Typography.Title>
            <WidgetAliasTag
              widget={selectedLogicItem.widget}
              alias={selectedLogicItem?.alias ?? ''}
            />
          </Flex>
          <CloseOutlined
            className="font-size-md"
            onClick={() => onToggleLogic()}
          />
        </Flex>
      </div>
      <div className="p-2">
        <Form.List name={['logic', 'conditions']}>
          {(fields, { add, remove }) => {
            const onAdd = () => {
              const lastIndex = fields.length;
              setCollapseKeys([
                ...collapseKeys,
                lastIndex.toString(),
              ]);
              add({
                condition: 'select',
              });
            };

            const onRemove = (fieldIndex: number) => {
              const newCollapseKeys = collapseKeys.filter(
                (key) => key !== fieldIndex.toString()
              );
              setCollapseKeys(newCollapseKeys);
              remove(fieldIndex);
            };

            return (
              <>
                {fields.length === 0 && (
                  <Empty className="mb-4" />
                )}
                {fields.map((field, index) => (
                  <Collapse
                    className="mb-2"
                    activeKey={collapseKeys}
                    onChange={onCollapseChange}
                    key={`collapse-${index}`}
                  >
                    <Collapse.Panel
                      header={`logic ${index + 1}`}
                      key={field.name}
                      extra={
                        <DeleteOutlined
                          onClick={() =>
                            onRemove(field.name)
                          }
                        />
                      }
                    >
                      <Form.Item
                        label="ถ้า"
                        name={[field.name, 'when']}
                        rules={[
                          validation.required('ถ้า'),
                        ]}
                      >
                        <Select
                          options={logicFieldsOptions}
                        />
                      </Form.Item>
                      <Row gutter={[12, 24]}>
                        <Col {...getColLayout(8)}>
                          <Form.Item
                            {...field}
                            name={[
                              field.name,
                              'condition',
                            ]}
                            rules={[
                              validation.required(
                                'เงื่อนไข'
                              ),
                            ]}
                          >
                            <Select
                              className="w-100"
                              options={[
                                {
                                  label: 'เลือก',
                                  value: 'select',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...getColLayout(16)}>
                          <Form.Item
                            shouldUpdate={(
                              prevValues,
                              curValues
                            ) =>
                              prevValues.logic
                                ?.conditions[index]
                                ?.when !==
                              curValues.logic?.conditions[
                                index
                              ]?.when
                            }
                          >
                            {({ getFieldValue }) => {
                              const when = getFieldValue([
                                'logic',
                                'conditions',
                                index,
                                'when',
                              ]);

                              const item =
                                logicFields.find(
                                  (item) =>
                                    item.key === when
                                );

                              const valuesOptions =
                                item?.options?.map(
                                  (option, index) => ({
                                    label: option?.title,
                                    value:
                                      index.toString(),
                                  })
                                );

                              return (
                                <Form.Item
                                  {...field}
                                  name={[
                                    field.name,
                                    'equal',
                                  ]}
                                >
                                  <Select
                                    options={
                                      valuesOptions
                                    }
                                    className="w-100"
                                  />
                                </Form.Item>
                              );
                            }}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label="จากนั้นไปที่"
                        {...field}
                        name={[field.name, 'then']}
                        rules={[
                          validation.required(
                            'จากนั้นไปที่'
                          ),
                        ]}
                      >
                        <Select
                          options={logicFieldsOptions}
                        />
                      </Form.Item>
                    </Collapse.Panel>
                  </Collapse>
                ))}
                <Button
                  icon={<PlusOutlined />}
                  type="dashed"
                  block
                  onClick={() => onAdd()}
                  className="mb-3"
                >
                  เพิ่ม
                </Button>
              </>
            );
          }}
        </Form.List>
        <Form.Item
          label="อื่น ๆ ไปที่"
          name={['logic', 'else']}
          rules={[validation.required('อื่น ๆ ไปที่')]}
        >
          <Select options={logicFieldsOptions} />
        </Form.Item>
        <Divider />
        <Button type="primary" block htmlType="submit">
          บันทึก
        </Button>
      </div>
    </Form>
  );
};
