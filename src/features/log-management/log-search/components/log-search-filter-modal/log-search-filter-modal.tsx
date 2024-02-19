import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout, validation } from '@/utils';

type LogSearchFilterModalProps = {
  open: boolean;
  filters?: Record<string, unknown>[];
  onFilter: (value: Record<string, unknown>) => void;
  onCancel: () => void;
};

export const LogSearchFilterModal = ({
  open,
  filters,
  onFilter,
  onCancel,
}: LogSearchFilterModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const filter = Form.useWatch('filters', form);

  const renderInputComponent = (type: string) => {
    switch (type) {
      case 'is':
      case 'not':
      case undefined:
        return (
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'logManagement.logSearch.filter.value'
                ),
              }) as string
            }
          />
        );
      case 'is_one_of':
      case 'is_not_one_of':
        return (
          <Select
            mode="tags"
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'logManagement.logSearch.filter.value'
                ),
              }) as string
            }
          />
        );
      default:
        return <Input disabled />;
    }
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onFilter(values);
  };

  const onChangeCondition = (
    condition: string,
    index: number
  ): void => {
    if (
      ['is_one_of', 'is_not_one_of'].includes(condition)
    ) {
      form.setFieldValue(
        ['filters', index, 'value'],
        undefined
      );
    }
  };

  useEffect(() => {
    const initalValue = () => {
      if (filters) form.setFieldsValue({ filters });
      else
        form.setFieldsValue({
          filters: [
            {
              field: undefined,
              condition: undefined,
              value: undefined,
            },
          ],
        });
    };

    if (open) initalValue();
  }, [filters, form, open]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <IntlMessage id="logManagement.logSearch.filter.title" />
      }
      centered
      onOk={onSubmit}
      afterClose={() => form.resetFields()}
    >
      <Form layout="vertical" form={form}>
        <Form.List name="filters">
          {(fields, { add, remove }) => (
            <>
              {fields.map(
                ({ key, name, ...restField }, index) => (
                  <Row
                    key={key}
                    gutter={[16, 16]}
                    className={css`
                      margin-bottom: 24px;

                      .ant-form-item {
                        margin-bottom: 0;
                      }
                    `}
                    align="middle"
                  >
                    <Col
                      {...getColLayout([
                        24, 24, 8, 8, 8, 8,
                      ])}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'field']}
                        rules={[
                          validation.required(
                            <IntlMessage id="logManagement.required" />
                          ),
                        ]}
                        label={
                          <IntlMessage id="logManagement.logSearch.filter.field" />
                        }
                      >
                        <Select
                          showSearch
                          options={[
                            {
                              label: 'test.host',
                              value: 'test.host',
                            },
                          ]}
                          placeholder={
                            t(
                              'logManagement.selectPlaceholder',
                              {
                                field: t(
                                  'logManagement.logSearch.filter.field'
                                ),
                              }
                            ) as string
                          }
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      {...getColLayout([
                        24, 24, 7, 7, 7, 7,
                      ])}
                    >
                      <Form.Item
                        {...restField}
                        label={
                          <IntlMessage id="logManagement.logSearch.filter.operator" />
                        }
                        name={[name, 'condition']}
                        rules={[
                          validation.required(
                            <IntlMessage id="logManagement.required" />
                          ),
                        ]}
                      >
                        <Select
                          options={[
                            {
                              label: 'is',
                              value: 'is',
                            },
                            {
                              label: 'not',
                              value: 'not',
                            },
                            {
                              label: 'is one of',
                              value: 'is_one_of',
                            },
                            {
                              label: 'is not one of',
                              value: 'is_not_one_of',
                            },
                            {
                              label: 'exists',
                              value: 'exists',
                            },
                            {
                              label: 'does not exist',
                              value: 'does_not_exist',
                            },
                          ]}
                          placeholder={
                            t(
                              'logManagement.selectPlaceholder',
                              {
                                field: t(
                                  'logManagement.logSearch.filter.operator'
                                ),
                              }
                            ) as string
                          }
                          onChange={(value: string) =>
                            onChangeCondition(
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      {...getColLayout([
                        23, 23, 8, 8, 8, 8,
                      ])}
                    >
                      <Form.Item
                        {...restField}
                        label={
                          <IntlMessage id="logManagement.logSearch.filter.value" />
                        }
                        name={[name, 'value']}
                        rules={
                          filter?.[index]?.condition ===
                            'exists' ||
                          filter?.[index]?.condition ===
                            'does_not_exist'
                            ? []
                            : [
                                validation.required(
                                  <IntlMessage id="logManagement.required" />
                                ),
                              ]
                        }
                      >
                        {renderInputComponent(
                          filter?.[index]?.condition
                        )}
                      </Form.Item>
                    </Col>

                    <DeleteOutlined
                      className={css`
                        padding-top: 33px;
                      `}
                      onClick={() => remove(name)}
                    />
                  </Row>
                )
              )}

              <Form.Item className="mb-0">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined className="mr-1" />}
                >
                  <IntlMessage id="logManagement.add" />
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
