import {
  Card,
  Collapse,
  Form,
  FormInstance,
  InputNumber,
  Switch,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

export type WebformSettingProps = {
  form?: FormInstance;
};

export const WebformSetting = ({
  form,
}: WebformSettingProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Form form={form} layout="vertical">
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
                    label={
                      <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.sentBeforeClose" />
                    }
                    name="SentBeforeClose"
                    rules={[
                      validation.required(
                        t(
                          'dsarAutomation.setting.webForm.detail.setting.sentBeforeCloseRequired'
                        )
                      ),
                    ]}
                  >
                    <InputNumber
                      addonAfter={
                        <IntlMessage id="dsarAutomation.setting.webForm.day" />
                      }
                      min={0}
                      max={99}
                    />
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
              className="mb-0"
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.detail.setting.lifetime.desc" />
              }
              name="lifetime"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.setting.webForm.detail.setting.lifetime.descRequired'
                  )
                ),
              ]}
            >
              <InputNumber
                addonAfter={
                  <IntlMessage id="dsarAutomation.setting.webForm.day" />
                }
                min={0}
                max={99}
              />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </Card>
  );
};
