import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  Select,
  Tooltip,
  Typography,
  Row,
  Col,
  Button,
  FormInstance,
  InputNumber,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';

import { AliasIndice, RuleInfo } from '../../types';

import {
  operatorOptions,
  severityOptions,
  whenOptions,
} from './select-option';

const { Option } = Select;

type RuleCustomizeFormStep2Props = {
  data?: RuleInfo;
  form: FormInstance;
  isEditor: boolean;
  field: AliasIndice[];
  loadingField?: boolean;
};

type SeverityObj = {
  [key: string]: {
    index: number;
    value: number;
  };
};

export const RuleCustomizeFormStep2 = ({
  data,
  form,
  isEditor,
  field,
  loadingField,
}: RuleCustomizeFormStep2Props) => {
  const { t } = useTranslation();
  const trigger = data?.components[0].trigger;

  const [state, setState] = useState({
    disableField:
      trigger?.aggregate.type === 'count' ? true : false,
  });
  const [selectedSeverity, setSelectedSeverity] =
    useState<string[]>([]);
  const [fieldOptions, setFieldOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const severityValue = Form.useWatch(
    [
      'components',
      0,
      'trigger',
      'thresholds',
      'severity',
    ],
    form
  );

  const indiceValue = Form.useWatch(
    ['components', 0, 'indices'],
    form
  );

  const onChangeWhen = (value: string) => {
    if (value === 'count') {
      setState((prev) => ({
        ...prev,
        disableField: true,
      }));

      form.setFieldValue(
        [
          'components',
          0,
          'trigger',
          'aggregate',
          'field',
        ],
        ''
      );
    } else {
      setFieldOptions(
        field?.filter((item) => item.type === 'long') ??
          []
      );

      setState((prev) => ({
        ...prev,
        disableField: false,
      }));
    }
  };

  const validateSeverity = (
    value: number,
    index: number
  ) => {
    return new Promise((resolve, reject) => {
      if (selectedSeverity.length === 1) resolve(null);

      const severityObj: SeverityObj = {};
      selectedSeverity.forEach((item, i) => {
        severityObj[item] = {
          index: i,
          value: severityValue[i].value,
        };
      });

      const severity = selectedSeverity[index];
      switch (severity) {
        case 'LOW':
          if (
            severityObj['MEDIUM'] &&
            severityObj['MEDIUM'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['MEDIUM'].value}`
            );
          } else if (
            severityObj['HIGH'] &&
            severityObj['HIGH'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['HIGH'].value}`
            );
          } else if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['CRITICAL'].value}`
            );
          }

          break;
        case 'MEDIUM':
          if (
            severityObj['HIGH'] &&
            severityObj['HIGH'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['HIGH'].value}`
            );
          } else if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['CRITICAL'].value}`
            );
          }
          break;
        case 'HIGH':
          if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `number of times must be less than ${severityObj['CRITICAL'].value}`
            );
          }
          break;
        default:
          break;
      }
      resolve(null);
    });
  };

  const onChangeSeverity = (
    type: string,
    index: number
  ) => {
    const selected = selectedSeverity;
    selected[index] = type;
    setSelectedSeverity(selected);
  };

  const onDelete = (index: number) => {
    const selected = selectedSeverity;
    selectedSeverity.splice(index, 1);
    setSelectedSeverity(selected);
  };

  useEffect(() => {
    if (data) {
      const selected =
        data.components[0].trigger.thresholds.severity?.map(
          (item) => item.type
        );

      setSelectedSeverity(selected ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (field) setFieldOptions(field);
  }, [field]);

  return (
    <div className="pl-3">
      <Typography.Title
        level={3}
        className={`mb-4 ${css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}`}
      >
        <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepTwo" />
        <Tooltip
          overlayClassName={css`
            white-space: pre-line;
          `}
          title={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepTwoTooltip" />
          }
        >
          <QuestionCircleOutlined
            className={css`
              margin-left: 5px;
              font-size: 12px;
            `}
          />
        </Tooltip>
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col {...getColLayout([8, 8, 8, 8, 8, 8])}>
          <Form.Item
            label={
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.when" />
            }
            name={[
              'components',
              0,
              'trigger',
              'aggregate',
              'type',
            ]}
          >
            <Select
              options={whenOptions}
              disabled={!isEditor}
              onChange={onChangeWhen}
              placeholder={
                t('logManagement.selectPlaceholder', {
                  field: t(
                    'siem.detectionRuleCreateAndEditRule.when'
                  ),
                }) as string
              }
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout([16, 16, 16, 16, 16, 16])}>
          <Form.Item
            label={
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.fields" />
            }
            name={[
              'components',
              0,
              'trigger',
              'aggregate',
              'field',
            ]}
          >
            <Select
              showSearch
              options={fieldOptions ?? []}
              disabled={
                state.disableField || !indiceValue
              }
              loading={loadingField}
              placeholder={
                t('logManagement.selectPlaceholder', {
                  field: t(
                    'siem.detectionRuleCreateAndEditRule.fields'
                  ),
                }) as string
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col {...getColLayout([24, 24, 8, 8, 8, 8])}>
          <Form.Item
            className="mb-0"
            name={[
              'components',
              0,
              'trigger',
              'thresholds',
              'operator',
            ]}
            label={
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.is" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
          >
            <Select
              options={operatorOptions}
              disabled={!isEditor}
              placeholder={
                t('logManagement.selectPlaceholder', {
                  field: t(
                    'siem.detectionRuleCreateAndEditRule.is'
                  ),
                }) as string
              }
            />
          </Form.Item>
        </Col>

        <Col
          {...getColLayout([24, 24, 16, 16, 16, 16])}
          className={css`
            .ant-row:nth-last-child(2) {
              margin-bottom: 0 !important;
            }
          `}
        >
          <Form.List
            name={[
              'components',
              0,
              'trigger',
              'thresholds',
              'severity',
            ]}
            rules={[
              {
                validator: async (_, severity) => {
                  if (!severity || severity.length < 1) {
                    return Promise.reject(
                      new Error('At least 1 severity')
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(
                  (
                    { key, name, ...restField },
                    index
                  ) => (
                    <Row
                      key={key}
                      gutter={[16, 16]}
                      className="mb-3"
                    >
                      <Col
                        {...getColLayout([
                          24, 24, 12, 12, 12, 12,
                        ])}
                      >
                        <Form.Item
                          className="mb-0"
                          {...restField}
                          name={[name, 'value']}
                          label={
                            <IntlMessage id="siem.detectionRuleCreateAndEditRule.numberOfTimes" />
                          }
                          rules={[
                            validation.required(
                              <IntlMessage id="logManagement.required" />
                            ),
                            {
                              validator: (_, value) =>
                                validateSeverity(
                                  value,
                                  index
                                ),
                            },
                          ]}
                        >
                          <InputNumber
                            className={css`
                              width: 100% !important;
                            `}
                            readOnly={!isEditor}
                            placeholder={
                              t(
                                'logManagement.placeholder',
                                {
                                  field: t(
                                    'siem.detectionRuleCreateAndEditRule.numberOfTimes'
                                  ),
                                }
                              ) as string
                            }
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        {...getColLayout([
                          23, 23, 11, 11, 11, 11,
                        ])}
                      >
                        <Form.Item
                          className="mb-0"
                          {...restField}
                          name={[name, 'type']}
                          label={
                            <IntlMessage id="siem.detectionRuleCreateAndEditRule.severity" />
                          }
                          rules={[
                            validation.required(
                              <IntlMessage id="logManagement.required" />
                            ),
                          ]}
                        >
                          <Select
                            disabled={!isEditor}
                            onChange={(value) =>
                              onChangeSeverity(
                                value,
                                index
                              )
                            }
                            placeholder={
                              t(
                                'logManagement.selectPlaceholder',
                                {
                                  field: t(
                                    'siem.detectionRuleCreateAndEditRule.severity'
                                  ),
                                }
                              ) as string
                            }
                          >
                            {severityOptions.map(
                              (option) =>
                                (!selectedSeverity.includes(
                                  option.value
                                ) ||
                                  selectedSeverity[
                                    index
                                  ] === option.value) && (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    <IntlMessage
                                      id={option.key}
                                    />
                                  </Option>
                                )
                            )}
                          </Select>
                        </Form.Item>
                      </Col>

                      <DeleteOutlined
                        className={css`
                          position: relative;
                          top: 42px;
                        `}
                        onClick={() => {
                          if (isEditor) {
                            remove(name);
                            onDelete(index);
                          }
                        }}
                      />
                    </Row>
                  )
                )}

                <Form.Item className="mb-0" label=" ">
                  {fields.length <
                    severityOptions.length && (
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      disabled={!isEditor}
                    >
                      <IntlMessage id="siem.detectionRuleCreateAndEditRule.add" />
                    </Button>
                  )}
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
};
