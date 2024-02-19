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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';

import { Monitor } from '../../types';

const notificationCountOptions = [
  { label: '40%', value: 40 },
  { label: '50%', value: 50 },
  { label: '60%', value: 60 },
  { label: '70%', value: 70 },
  { label: '80%', value: 80 },
  { label: '90%', value: 90 },
  { label: '100%', value: 100 },
];

export const severityOptions = [
  {
    label: <IntlMessage id="logManagement.low" />,
    value: 'LOW',
  },
  {
    label: <IntlMessage id="logManagement.medium" />,
    value: 'MEDIUM',
  },
  {
    label: <IntlMessage id="logManagement.high" />,
    value: 'HIGH',
  },
  {
    label: <IntlMessage id="logManagement.critical" />,
    value: 'CRITICAL',
  },
];

type SeverityObj = {
  [key: string]: {
    index: number;
    value: number;
  };
};

type NotificationGroupSeverityFormProps = {
  form: FormInstance;
  monitor?: Monitor;
};

export const NotificationGroupSeverityForm = ({
  form,
  monitor,
}: NotificationGroupSeverityFormProps) => {
  const { t } = useTranslation();
  const lifeCycle = Form.useWatch('life_cycle');

  const [selectedSeverity, setSelectedSeverity] =
    useState<string[]>([]);

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
          value: lifeCycle[i].value,
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
              `notification count must be less than ${severityObj['MEDIUM'].value}%`
            );
          } else if (
            severityObj['HIGH'] &&
            severityObj['HIGH'].value <= value
          ) {
            reject(
              `notification count must be less than ${severityObj['HIGH'].value}%`
            );
          } else if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `notification count must be less than ${severityObj['CRITICAL'].value}%`
            );
          }

          break;
        case 'MEDIUM':
          if (
            severityObj['HIGH'] &&
            severityObj['HIGH'].value <= value
          ) {
            reject(
              `notification count must be less than ${severityObj['HIGH'].value}%`
            );
          } else if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `notification count must be less than ${severityObj['CRITICAL'].value}%`
            );
          }
          break;
        case 'HIGH':
          if (
            severityObj['CRITICAL'] &&
            severityObj['CRITICAL'].value <= value
          ) {
            reject(
              `notification count must be less than ${severityObj['CRITICAL'].value}%`
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

    form.setFieldValue(
      ['life_cycle', index, 'value'],
      undefined
    );
  };

  const onDelete = (index: number) => {
    const selected = selectedSeverity;
    selectedSeverity.splice(index, 1);
    setSelectedSeverity(selected);
  };

  useEffect(() => {
    if (monitor?.life_cycle) {
      const selected = monitor.life_cycle.map(
        (item) => item.severity
      );

      setSelectedSeverity(selected ?? []);
    }
  }, [monitor]);

  return (
    <Form.List
      name={['life_cycle']}
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
            ({ key, name, ...restField }, index) => (
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
                      <IntlMessage id="logManagement.indices.notificationCount" />
                    }
                    rules={[
                      validation.required(
                        <IntlMessage id="logManagement.required" />
                      ),
                      {
                        validator: (_, value) =>
                          validateSeverity(value, index),
                      },
                    ]}
                  >
                    <Select
                      options={notificationCountOptions}
                      placeholder={
                        t(
                          'logManagement.selectPlaceholder',
                          {
                            field: t(
                              'logManagement.indices.notificationCount'
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
                    name={[name, 'severity']}
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
                      onChange={(value) =>
                        onChangeSeverity(value, index)
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
                            selectedSeverity[index] ===
                              option.value) && (
                            <Select.Option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </Select.Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="d-none"
                    name={[name, 'is_global']}
                    initialValue={true}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <DeleteOutlined
                  className={css`
                    position: relative;
                    top: 43px;
                    height: fit-content;
                  `}
                  onClick={() => {
                    if (lifeCycle.length < 2) return;
                    remove(name);
                    onDelete(index);
                  }}
                />
              </Row>
            )
          )}

          {fields.length < 4 && (
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.add" />
            </Button>
          )}
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
  );
};
