import { Flex } from '@mantine/core';
import {
  Card,
  Collapse,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Switch,
} from 'antd';
import _ from 'lodash';

import { useGetWebformMeta } from '@/features/data-breach';
import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

export type WebformSettingProps = {
  form?: FormInstance;
};

export const WebformSetting = ({
  form,
}: WebformSettingProps) => {
  const { data: meta, isLoading } = useGetWebformMeta();

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:update'],
    ],
  });

  const timeTypeMeta = meta?.time_type;

  const durationTypeOptions = timeTypeMeta?.map(
    (durationType) => ({
      label: durationType?.name,
      value: durationType?.ObjectUUID,
    })
  );

  return (
    <Card loading={isLoading}>
      <Form
        form={form}
        layout="vertical"
        disabled={!editPermission.isAllow}
      >
        <Collapse defaultActiveKey={['1', '2', '3']}>
          <Collapse.Panel
            header={
              <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.captcha" />
            }
            key="1"
          >
            <DescriptionBlock
              className="pr-2"
              title={
                <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.captcha.desc" />
              }
              extra={
                <Form.Item
                  className="mb-0"
                  name="isCaptcha"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage id="dsarAutomation.setting.webForm.on" />
                    }
                    unCheckedChildren={
                      <IntlMessage id="dsarAutomation.setting.webForm.off" />
                    }
                  />
                </Form.Item>
              }
              divider={false}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.notification" />
            }
            key="2"
          >
            <DescriptionBlock
              className="pr-2"
              title={
                <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.notification.desc" />
              }
              extra={
                <Form.Item
                  className="mb-0"
                  name="isSentEmail"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage id="dsarAutomation.setting.webForm.on" />
                    }
                    unCheckedChildren={
                      <IntlMessage id="dsarAutomation.setting.webForm.off" />
                    }
                  />
                </Form.Item>
              }
              divider={false}
            />

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues?.isSentEmail !==
                currentValues?.isSentEmail
              }
            >
              {({ getFieldValue }) => {
                if (!getFieldValue('isSentEmail')) {
                  return null;
                }

                return (
                  <Form.Item
                    label="เตือนก่อนวันครบกำหนด :"
                    className="w-50"
                    required
                  >
                    <Flex gap={8}>
                      <Form.Item
                        shouldUpdate={(
                          prevValues,
                          nextValues
                        ) =>
                          prevValues?.SentBeforeClose
                            ?.type !==
                          nextValues?.SentBeforeClose
                            ?.type
                        }
                        className="w-100 mb-0"
                      >
                        {({ getFieldValue }) => {
                          const timeTypeStep =
                            _.find(timeTypeMeta, {
                              ObjectUUID: getFieldValue([
                                'SentBeforeClose',
                                'type',
                              ]),
                            })?.step ?? 1;

                          return (
                            <Form.Item
                              className="mb-0"
                              name={[
                                'SentBeforeClose',
                                'value',
                              ]}
                              rules={[
                                validation.required(
                                  'เตือนก่อนวันครบกำหนด'
                                ),
                              ]}
                            >
                              <InputNumber
                                min={1}
                                max={99}
                                step={timeTypeStep}
                                className="w-100"
                              />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                      <Form.Item
                        className="mb-0 w-100"
                        name={['SentBeforeClose', 'type']}
                        rules={[
                          validation.required(
                            'เตือนก่อนวันครบกำหนด'
                          ),
                        ]}
                      >
                        <Select
                          className="w-100"
                          options={durationTypeOptions}
                        />
                      </Form.Item>
                    </Flex>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.lifetime" />
            }
            key="3"
          >
            <Form.Item
              label="ระยะเวลาการดำเนินการ"
              className="w-50"
              required
            >
              <Flex gap={8}>
                <Form.Item
                  shouldUpdate={(
                    prevValues,
                    nextValues
                  ) =>
                    prevValues?.lifetime?.type !==
                    nextValues?.lifetime?.type
                  }
                  className="w-100 mb-0"
                >
                  {({ getFieldValue }) => {
                    const timeTypeStep =
                      _.find(timeTypeMeta, {
                        ObjectUUID: getFieldValue([
                          'lifetime',
                          'type',
                        ]),
                      })?.step ?? 1;

                    return (
                      <Form.Item
                        className="mb-0"
                        name={['lifetime', 'value']}
                        rules={[
                          validation.required(
                            'กรุณากรอกระยะเวลาการทำงาน'
                          ),
                        ]}
                      >
                        <InputNumber
                          min={1}
                          max={99}
                          step={timeTypeStep}
                          className="w-100"
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
                <Form.Item
                  className="mb-0 w-100"
                  name={['lifetime', 'type']}
                  rules={[
                    validation.required(
                      'กรุณากรอกระยะเวลาการทำงาน'
                    ),
                  ]}
                >
                  <Select
                    className="w-100"
                    options={durationTypeOptions}
                  />
                </Form.Item>
              </Flex>
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </Card>
  );
};
