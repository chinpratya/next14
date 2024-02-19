import {
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';

import { tokens } from '@/lang';
import { getColLayout } from '@/utils';
import { APIIconOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

export type PolicySettingProps = {
  form: FormInstance;
};

export const PolicySetting = ({
  form,
}: PolicySettingProps) => {
  return (
    <Card>
      <Collapse
        defaultActiveKey={[
          'policy-review',
          'policy-information',
          'policy-publication',
        ]}
      >
        <Collapse.Panel
          header={
            <IntlMessage id="policyManagement.policy.detail.setting.policyReview" />
          }
          key="policy-review"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              policy_review_schedule_unit: 'day',
              reminder_before_due_date_unit: 'day',
            }}
          >
            <Row
              justify="space-between"
              align="middle"
              gutter={[10, 10]}
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="policyManagement.policy.detail.setting.schedulePolicy" />
                </Typography.Title>
              </Col>
              <Col
                {...getColLayout([24, 24, 2, 2, 2, 2])}
              >
                <Form.Item
                  name={['settings', 'isReview']}
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage id="policyManagement.policy.detail.setting.on" />
                    }
                    unCheckedChildren={
                      <IntlMessage id="policyManagement.policy.detail.setting.off" />
                    }
                  />
                </Form.Item>
              </Col>
              <Form.Item
                shouldUpdate={(
                  prevValues,
                  currentValues
                ) =>
                  prevValues.settings?.isReview !==
                  currentValues.settings?.isReview
                }
                noStyle
              >
                {({ getFieldsValue }) => {
                  const policyReview =
                    getFieldsValue().settings?.isReview;

                  if (!policyReview) return null;

                  return (
                    <>
                      <Col
                        {...getColLayout([
                          24, 24, 8, 8, 8, 8,
                        ])}
                      >
                        <Form.Item
                          name={[
                            'settings',
                            'policy_review_schedule',
                          ]}
                          label={
                            <IntlMessage id="policyManagement.policy.detail.setting.period" />
                          }
                        >
                          <Input
                            addonAfter={
                              <Form.Item
                                name={[
                                  'settings',
                                  'policy_review_schedule_unit',
                                ]}
                                noStyle
                              >
                                <Select
                                  style={{
                                    minWidth: 90,
                                  }}
                                >
                                  <Select.Option value="day">
                                    <IntlMessage id="policyManagement.policy.detail.setting.day" />
                                  </Select.Option>
                                  <Select.Option value="month">
                                    <IntlMessage id="policyManagement.policy.detail.setting.month" />
                                  </Select.Option>
                                  <Select.Option value="year">
                                    <IntlMessage id="policyManagement.policy.detail.setting.year" />
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            }
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        {...getColLayout([
                          24, 24, 24, 24, 24, 24,
                        ])}
                        style={{ wordWrap: 'break-word' }}
                      >
                        <Typography.Title level={4}>
                          <IntlMessage id="policyManagement.policy.detail.setting.notification" />
                        </Typography.Title>
                      </Col>
                      <Col
                        {...getColLayout([
                          24, 24, 8, 8, 8, 8,
                        ])}
                      >
                        <Form.Item
                          label={
                            <IntlMessage id="policyManagement.policy.detail.setting.reminder" />
                          }
                          name={[
                            'settings',
                            'reminder_before_due_date',
                          ]}
                        >
                          <Input
                            addonAfter={
                              <Form.Item
                                name={[
                                  'settings',
                                  'reminder_before_due_date_unit',
                                ]}
                                noStyle
                              >
                                <Select
                                  style={{
                                    minWidth: 90,
                                  }}
                                >
                                  <Select.Option value="day">
                                    <IntlMessage id="policyManagement.policy.detail.setting.day" />
                                  </Select.Option>
                                  <Select.Option value="month">
                                    <IntlMessage id="policyManagement.policy.detail.setting.month" />
                                  </Select.Option>
                                  <Select.Option value="year">
                                    <IntlMessage id="policyManagement.policy.detail.setting.year" />
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            }
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                }}
              </Form.Item>
            </Row>
          </Form>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="policyManagement.policy.detail.setting.policyInformation" />
          }
          key="policy-information"
        >
          <Form form={form} layout="vertical">
            <Row
              justify="space-between"
              align="middle"
              gutter={[10, 10]}
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="policyManagement.policy.detail.setting.policyInformation" />
                </Typography.Title>
                <Typography.Text type="secondary">
                  <IntlMessage id="policyManagement.policy.detail.setting.policyInformation.desc" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 2, 2, 2, 2])}
              >
                <Form.Item
                  name={['settings', 'isAPI']}
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage id="policyManagement.policy.detail.setting.on" />
                    }
                    unCheckedChildren={
                      <IntlMessage id="policyManagement.policy.detail.setting.off" />
                    }
                  />
                </Form.Item>
              </Col>
              <Form.Item
                shouldUpdate={(
                  prevValues,
                  currentValues
                ) =>
                  prevValues.settings?.isAPI !==
                  currentValues.settings?.isAPI
                }
                noStyle
              >
                {({ getFieldsValue }) => {
                  const isAPI =
                    getFieldsValue().settings?.isAPI;

                  if (!isAPI) return null;

                  return (
                    <Col
                      {...getColLayout([
                        24, 24, 24, 24, 24, 24,
                      ])}
                    >
                      <Form.Item
                        name={['settings', 'apiURL']}
                        label="API ปลายทาง"
                      >
                        <Input
                          prefix={
                            <APIIconOutlined className="text-primary" />
                          }
                          placeholder="กรุณากรองลิงค์ API"
                        />
                      </Form.Item>
                    </Col>
                  );
                }}
              </Form.Item>
            </Row>
          </Form>
        </Collapse.Panel>
        <Collapse.Panel
          header="กำหนดวันเผยแพร่นโยบาย"
          key="policy-publication"
        >
          <Form form={form} layout="vertical">
            <Row
              justify="space-between"
              align="middle"
              gutter={[10, 10]}
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  วันเผยแพร่นโยบาย
                </Typography.Title>
                <Typography.Text type="secondary">
                  เมื่อเปิดจะต้องกำหนดระยะเวลาการเผยแพร่ของนโยบาย
                  หากการตั้งค่านี้เปิดอยู่จะไม่สามาราบันทึกเผยแพร่ได้
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 2, 2, 2, 2])}
              >
                <Form.Item
                  name={['settings', 'isPublish']}
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Form.Item
                shouldUpdate={(
                  prevValues,
                  currentValues
                ) =>
                  prevValues.settings?.isPublish !==
                  currentValues.settings?.isPublish
                }
                noStyle
              >
                {({ getFieldsValue }) => {
                  const isPublish =
                    getFieldsValue().settings?.isPublish;

                  if (!isPublish) return null;

                  return (
                    <Col
                      {...getColLayout([
                        24, 24, 24, 24, 24, 24,
                      ])}
                    >
                      <Form.Item
                        name={['settings', 'publish_at']}
                        label="วันเวลาที่ต้องการเผยแพร่นโยบาย"
                      >
                        <DatePicker
                          className="w-25"
                          showTime={{
                            format: 'HH:mm:ss',
                          }}
                          format="YYYY-MM-DD HH:mm:ss"
                        />
                      </Form.Item>
                    </Col>
                  );
                }}
              </Form.Item>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};
