import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';

import { AliasIndice } from '../../types';

import { conditionOptions } from './select-option';

type FilterFormProps = {
  isEditor: boolean;
  form: FormInstance;
  field: AliasIndice[];
};

export const FilterForm = ({
  isEditor,
  form,
  field,
}: FilterFormProps) => {
  const { t } = useTranslation();
  const filter = Form.useWatch('filters', form);

  const renderInputComponent = (type: string) => {
    switch (type) {
      case 'is':
      case 'not':
      case undefined:
        return (
          <Input
            readOnly={!isEditor}
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
            disabled={!isEditor}
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

  return (
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
                        options={field ?? []}
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
                        options={conditionOptions}
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
                          onChangeCondition(value, index)
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
                    onClick={() =>
                      isEditor ? remove(name) : {}
                    }
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
                disabled={!isEditor}
              >
                <IntlMessage id="logManagement.add" />
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
