import { css } from '@emotion/css';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Checkbox,
  FormInstance,
  Select,
  Collapse,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { getColLayout, validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityCollect } from '../../api/get-activity-collect';
import { useGetActivityMeta } from '../../api/get-activity-meta';

export type ActivityCollectFormProps = {
  activityId: string;
  form: FormInstance;
};

export const ActivityCollectForm = ({
  activityId,
  form,
}: ActivityCollectFormProps) => {
  const { data } = useGetActivityCollect(activityId);
  const meta = useGetActivityMeta({});
  const options = _.map(meta?.data?.storageType, (v) => {
    return { label: v.name, value: v.ObjectUUID };
  });

  const [isDataUsagePeriod, setIsDataUsagePeriod] =
    useState(data?.isDataUsagePeriod as boolean);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [form, data]);

  return (
    <>
      <Form form={form} layout="vertical">
        <Collapse defaultActiveKey={1} className="my-3">
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.collect.dataStoreType.title" />
            }
            key={1}
          >
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.collect.dataStoreType" />
              }
              name="dataStoreTypeID"
              rules={[
                validation.required(
                  'กรุณากรอกข้อมูลประเภทของข้อมูลที่จัดเก็บ'
                ),
              ]}
            >
              <Checkbox.Group options={options} />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={1}>
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.collect.dataUsagePeriod" />
            }
            key={1}
          >
            <Form.Item
              name="isDataUsagePeriod"
              rules={[
                validation.required(
                  'กรุณากรอกข้อมูลระยะเวลาการใช้ข้อมูล'
                ),
              ]}
            >
              <Radio.Group
                onChange={(e) =>
                  setIsDataUsagePeriod(e.target.value)
                }
                value={isDataUsagePeriod}
                options={[
                  {
                    label: 'ระบุชัดเจน',
                    value: true,
                  },
                  {
                    label: 'ระบุไม่ชัดเจน',
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.isDataUsagePeriod !==
                currentValues.isDataUsagePeriod
              }
              noStyle
            >
              {({ getFieldValue }) => {
                const isDataUsagePeriod = getFieldValue(
                  'isDataUsagePeriod'
                );
                if (isDataUsagePeriod) {
                  return (
                    <Row gutter={[16, 0]}>
                      <Col
                        {...getColLayout([
                          24, 24, 12, 12, 12, 12,
                        ])}
                      >
                        <Form.Item
                          label={
                            <IntlMessage id="dataMapping.purpose.create.fill_in_data_usage_period" />
                          }
                          name={[
                            'dataUsagePeriod',
                            'value',
                          ]}
                          rules={[
                            validation.required(
                              'กรุณากรอก ระยะเวลาการให้ข้อมูล'
                            ),
                          ]}
                        >
                          <InputNumber
                            className="w-100"
                            min={1}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        {...getColLayout([
                          24, 24, 12, 12, 12, 12,
                        ])}
                      >
                        <Form.Item
                          name={[
                            'dataUsagePeriod',
                            'type',
                          ]}
                          rules={[
                            validation.required(
                              'กรุณาเลือก วัน/เดือน/ปี'
                            ),
                          ]}
                          className={css`
                            margin-top: 29px !important;
                            margin-left: 10px;
                          `}
                        >
                          <Select
                            options={[
                              {
                                label: (
                                  <IntlMessage id="dataMapping.purpose.create.day" />
                                ),
                                value: 'day',
                              },
                              {
                                label: (
                                  <IntlMessage id="dataMapping.purpose.create.month" />
                                ),
                                value: 'month',
                              },
                              {
                                label: (
                                  <IntlMessage id="dataMapping.purpose.create.year" />
                                ),
                                value: 'year',
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col {...getColLayout(24)}>
                        <Form.Item
                          label={
                            <IntlMessage id="dataMapping.purpose.detail" />
                          }
                          name={[
                            'dataUsagePeriod',
                            'description',
                          ]}
                        >
                          <Input.TextArea rows={3} />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Col {...getColLayout(12)}>
                      <Form.Item
                        label={
                          <IntlMessage id="dataMapping.activity.collect.description" />
                        }
                        name={[
                          'dataUsagePeriod',
                          'description',
                        ]}
                      >
                        <Input.TextArea rows={3} />
                      </Form.Item>
                    </Col>
                  );
                }
              }}
            </Form.Item>
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={1} className="my-3">
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.collect.dataRetentionMethod.title" />
            }
            key={1}
          >
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.collect.dataRetentionMethod" />
              }
              name="dataRetentionMethod"
              rules={[
                validation.required(
                  <IntlMessage id="dataMapping.activity.collect.dataRetentionMethodRequired" />
                ),
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.collect.methodRemoveWhenExpire" />
              }
              name="methodRemoveWhenExpire"
              rules={[
                validation.required(
                  <IntlMessage id="dataMapping.activity.collect.methodRemoveWhenExpireRequired" />
                ),
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </>
  );
};
