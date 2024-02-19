import { css } from '@emotion/css';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  FormInstance,
  Row,
  Col,
  Select,
} from 'antd';
import { useState } from 'react';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PurposeGeneralFormPeriodDataUsageProps = {
  form: FormInstance;
  dataIsDataUsagePeriod?: boolean;
};

export const PurposeGeneralFormPeriodDataUsage = ({
  form,
  dataIsDataUsagePeriod,
}: PurposeGeneralFormPeriodDataUsageProps) => {
  const [isDataUsagePeriod, setIsDataUsagePeriod] =
    useState(dataIsDataUsagePeriod as boolean);

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.basicInfo.usage.title" />
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          period_description: '',
        }}
      >
        <Form.Item
          name={'isDataUsagePeriod'}
          rules={[
            validation.required(
              'กรุณาเลือกระยะเวลาในการใช้ข้อมูล'
            ),
          ]}
        >
          <Radio.Group
            onChange={(e) =>
              setIsDataUsagePeriod(e.target.value)
            }
            value={isDataUsagePeriod}
            disabled
          >
            <Radio value={true}>
              {' '}
              <IntlMessage id="consentManagement.purpose.basicInfo.usage.clearlyState" />
            </Radio>
            <Radio value={false}>
              {' '}
              <IntlMessage id="consentManagement.purpose.basicInfo.usage.notClear" />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Row justify="space-between" align="middle">
          {isDataUsagePeriod === true ? (
            <>
              <Col
                {...getColLayout([
                  24, 24, 12, 12, 12, 12,
                ])}
              >
                <Form.Item
                  label={
                    <IntlMessage id="consentManagement.purpose.basicInfo.usage.enterUsage" />
                  }
                  name={['dataUsagePeriod', 'value']}
                  rules={[
                    validation.required(
                      <IntlMessage id="consentManagement.purpose.basicInfo.usage.enterUsageRequired" />
                    ),
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col
                {...getColLayout([
                  24, 24, 12, 12, 12, 12,
                ])}
              >
                <Form.Item
                  name={['dataUsagePeriod', 'type']}
                  rules={[
                    validation.required(
                      'กรุณาเลือก วัน/เดือน/ปี'
                    ),
                  ]}
                  className={css`
                    margin-top: 29px;
                    margin-left: 10px;
                  `}
                >
                  <Select
                    options={[
                      {
                        label: (
                          <IntlMessage id="consentManagement.purpose.basicInfo.usage.day" />
                        ),
                        value: 'day',
                      },
                      {
                        label: (
                          <IntlMessage id="consentManagement.purpose.basicInfo.usage.month" />
                        ),
                        value: 'month',
                      },
                      {
                        label: (
                          <IntlMessage id="consentManagement.purpose.basicInfo.usage.year" />
                        ),
                        value: 'year',
                      },
                    ]}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col {...getColLayout(24)}>
                <Form.Item
                  label={
                    <IntlMessage id="consentManagement.purpose.basicInfo.usage.description" />
                  }
                  name={[
                    'dataUsagePeriod',
                    'description',
                  ]}
                >
                  <Input.TextArea rows={3} disabled />
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.purpose.basicInfo.usage.description" />
                }
                name={['dataUsagePeriod', 'description']}
              >
                <Input.TextArea rows={3} disabled />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
};
