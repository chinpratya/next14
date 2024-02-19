import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  Select,
  Switch,
  Typography,
} from 'antd';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import timezone from '@/assets/data/timezone.json';
import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';

import { checkHost } from '../../api/check-host';

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

type SettingNtpFormProps = {
  form: FormInstance;
  editor?: boolean;
};

export const SettingNtpForm = ({
  form,
  editor = false,
}: SettingNtpFormProps) => {
  const { t } = useTranslation();
  const isSetupDevice = Form.useWatch('device', form);

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={!editor}
      className={css`
        .ant-input-disabled,
        .ant-picker-input > input[disabled],
        .ant-select-disabled.ant-select:not(
            .ant-select-customize-input
          )
          .ant-select-selector {
          color: ${CYBER_DISABLED_TEXT_COLOR};
        }
      `}
    >
      <Form.Item
        name="timestamp"
        label={
          <IntlMessage id="logManagement.setting.dateAndTime" />
        }
      >
        <DatePicker
          className="w-50"
          allowClear={false}
          showTime={{
            use12Hours: true,
            format: 'HH:mm A',
          }}
          format="DD/MM/YYYY , HH:mm A"
          disabled
        />
      </Form.Item>

      <Form.Item
        name="timezone"
        label={
          <IntlMessage id="logManagement.setting.timezone" />
        }
        initialValue="Asia/Bangkok"
      >
        <Select options={timezone.timezone} showSearch />
      </Form.Item>

      <Form.Item
        className="mb-1"
        label={
          <Typography.Text>
            <IntlMessage id="logManagement.setting.networkTimeProtocol" />
          </Typography.Text>
        }
        name="stat"
      >
        <Input.TextArea rows={4} disabled />
      </Form.Item>

      <Flex align="center" gap="sm">
        <Typography.Text className="font-weight-semibold">
          <IntlMessage id="logManagement.setting.setupDeviceAsLocalntpServer" />
        </Typography.Text>
        <Form.Item
          className="mb-0 p-0"
          name="device"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={t('logManagement.on')}
            unCheckedChildren={t('logManagement.off')}
          />
        </Form.Item>
      </Flex>

      <Divider className="mt-2 mb-4" />

      <Form.List name="hosts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Form.Item
                validateTrigger="onSubmit"
                key={key}
                name={name}
                className={css`
                  .ant-form-item-feedback-icon {
                    display: flex;
                    align-self: center;
                  }
                `}
                rules={[
                  {
                    async validator(_, value) {
                      if (!value) {
                        return Promise.reject(
                          new Error(
                            t(
                              'logManagement.required'
                            ) as string
                          )
                        );
                      }

                      const response = await checkHost({
                        host: value,
                      });

                      if (!response.data) {
                        return Promise.reject(
                          new Error(
                            t(
                              'logManagement.invalid'
                            ) as string
                          )
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder={
                    t('logManagement.placeholder', {
                      field: t('logManagement.hostname'),
                    }) as string
                  }
                  disabled={!isSetupDevice || !editor}
                  suffix={
                    <DeleteOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (!isSetupDevice || !editor) {
                          return;
                        }

                        remove(name);
                      }}
                    />
                  }
                />
              </Form.Item>
            ))}

            <Button
              icon={<PlusOutlined />}
              block
              type="dashed"
              onClick={() => add()}
              disabled={!isSetupDevice || !editor}
            >
              {t('logManagement.add')}
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};
