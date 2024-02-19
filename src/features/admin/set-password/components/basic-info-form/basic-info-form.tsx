import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Card,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

export type BasicInfoFormProps = {
  form: FormInstance;
  name: 'internal' | 'external';
  loading?: boolean;
};

export const BasicInfoForm = ({
  form,
  name,
  loading,
}: BasicInfoFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} name={name} layout="vertical">
      <Card
        title={
          name === 'internal' ? (
            <IntlMessage id="admin.businessSetting.setPassword.internal" />
          ) : (
            <IntlMessage id="admin.businessSetting.setPassword.external" />
          )
        }
        loading={loading}
        className={css`
          .ant-card-body {
            padding-top: ${loading ? '24px' : '0'};
          }
        `}
      >
        <Flex
          justifyContent="between"
          alignItems="center"
        >
          <Typography.Text>
            <IntlMessage id="admin.businessSetting.setPassword.temporary" />
          </Typography.Text>
          <Form.Item
            className="mb-2"
            name={[name, 'temporary']}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              checkedChildren={
                <IntlMessage id="admin.businessSetting.setPassword.on" />
              }
              unCheckedChildren={
                <IntlMessage id="admin.businessSetting.setPassword.off" />
              }
            />
          </Form.Item>
        </Flex>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[name]?.temporary !==
            currentValues[name]?.temporary
          }
          noStyle
        >
          {({ getFieldValue }) => {
            const temporary =
              getFieldValue([name, 'temporary']) === true;

            if (temporary) {
              return (
                <>
                  <Form.Item
                    name={[name, 'password_type']}
                  >
                    <Radio.Group>
                      <Radio value="system">
                        <IntlMessage id="admin.businessSetting.setPassword.password_type.system" />{' '}
                        <Tooltip
                          title={
                            <IntlMessage id="admin.businessSetting.setPassword.password_type.system.desc" />
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Divider className="mb-0" />

                  <Form.Item
                    className="mb-0"
                    name={[name, 'password_type']}
                  >
                    <Radio.Group>
                      <Radio value="default">
                        <IntlMessage id="admin.businessSetting.setPassword.password_type.default" />{' '}
                        <Tooltip
                          title={
                            <IntlMessage id="admin.businessSetting.setPassword.password_type.default.desc" />
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Divider className="mb-0" />

                  <Form.Item
                    className="mb-0"
                    name={[name, 'password_type']}
                  >
                    <Radio.Group>
                      <Radio value="customize">
                        <IntlMessage id="admin.businessSetting.setPassword.password_type.customize" />{' '}
                        <Tooltip
                          title={
                            <IntlMessage id="admin.businessSetting.setPassword.password_type.customize.desc" />
                          }
                        >
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    shouldUpdate={(
                      prevValues,
                      currentValues
                    ) =>
                      prevValues[name]?.password_type !==
                      currentValues[name]?.password_type
                    }
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      const customize =
                        getFieldValue([
                          name,
                          'password_type',
                        ]) === 'customize';

                      if (customize) {
                        return (
                          <Form.Item
                            name={[name, 'password']}
                            label={
                              <IntlMessage id="admin.businessSetting.setPassword.password_type.customize.newPassword" />
                            }
                            rules={[
                              validation.required(
                                t(
                                  'admin.businessSetting.setPassword.password_type.customize.newPasswordRequired'
                                )
                              ),
                              validation.password(
                                'Password'
                              ),
                            ]}
                          >
                            <Input.Password
                              placeholder={
                                t(
                                  'admin.businessSetting.setPassword.password_type.customize.newPasswordPlaceholder'
                                ) as string
                              }
                            />
                          </Form.Item>
                        );
                      }

                      return null;
                    }}
                  </Form.Item>
                </>
              );
            }
          }}
        </Form.Item>
      </Card>
    </Form>
  );
};
