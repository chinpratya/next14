import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Form,
  Typography,
  Divider,
  Input,
  Select,
  Switch,
  Button,
  FormInstance,
} from 'antd';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import timezone from '@/assets/data/timezone.json';
import { IntlMessage } from '@/components/util-components/intl-message';
import { checkHost } from '@/features/log-management';
import { validation } from '@/utils';

dayjs.extend(utc);
dayjs.extend(tz);

type InitalSystemWrapperProps = {
  form: FormInstance;
};

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

export const InitalSystemWrapperForm = ({
  form,
}: InitalSystemWrapperProps) => {
  const router = useRouter();
  const isSetupDevice = Form.useWatch('device', form);
  const timezoneValue = Form.useWatch(
    ['ntp', 'timezone'],
    form
  );

  const isModule = router.pathname.split('/')[3];
  const engineOptions = [
    { label: 'Syslog', value: 'collector-syslog' },
  ];

  useEffect(() => {
    if (timezoneValue) {
      form.setFieldValue(
        'timestamp',
        dayjs().tz(timezoneValue)
      );
    }
  }, [form, timezoneValue]);

  return (
    <Form layout="vertical" form={form}>
      <div className="px-4 pt-4">
        <Typography.Text strong>
          <IntlMessage id="logManagement.setting.ntpConfig.information" />
        </Typography.Text>
        <Form.Item
          label={
            <IntlMessage id="logManagement.organization" />
          }
          name="name"
          className="mt-3"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
            {
              pattern: new RegExp(
                '^[a-z0-9]+(?: [a-z0-9]+)*$'
              ),
              message: `กรอกได้เฉพาะตัวอักษรพิมพ์เล็กและตัวเลขเท่านั้น`,
            },
          ]}
        >
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t('logManagement.organization'),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          label={<IntlMessage id="logManagement.email" />}
          name="email"
          className="mb-0"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
            validation.email(),
          ]}
        >
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t('logManagement.email'),
              }) as string
            }
          />
        </Form.Item>
      </div>

      <Divider />

      <div className="px-4">
        <Typography.Text strong>
          <IntlMessage id="logManagement.setting.ntpConfig.systemTime" />
        </Typography.Text>
        <Form.Item
          className="mt-3"
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
          className="mb-2"
          label={
            <IntlMessage id="logManagement.setting.timezone" />
          }
          name={['ntp', 'timezone']}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
          initialValue="Asia/Bangkok"
        >
          <Select
            options={timezone.timezone}
            showSearch
          />
        </Form.Item>

        <Flex align="center" gap="sm">
          <Typography.Text className="font-weight-semibold">
            <IntlMessage id="logManagement.setting.setupDeviceAsLocalntpServer" />
          </Typography.Text>
          <Form.Item
            className="mb-0 p-0"
            name="device"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch
              checkedChildren={
                <IntlMessage id="logManagement.on" />
              }
              unCheckedChildren={
                <IntlMessage id="logManagement.off" />
              }
            />
          </Form.Item>
        </Flex>
      </div>

      <Divider className="mt-3" />

      <Form.Item
        name="engine"
        label={<IntlMessage id="logManagement.engine" />}
        className="px-4"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
        initialValue={
          isModule === 'log-management'
            ? ['collector-syslog']
            : undefined
        }
      >
        <Select
          mode="multiple"
          showSearch={false}
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.engine'),
            }) as string
          }
          options={
            isModule === 'log-management'
              ? engineOptions
              : [
                  ...engineOptions,
                  {
                    label: 'Logstash',
                    value: 'collector-logstash',
                  },
                ]
          }
        />
      </Form.Item>

      <Divider className="mt-3" />

      <div className="px-4 pb-4">
        <Typography.Text strong className="d-block mb-3">
          <IntlMessage id="logManagement.setting.ntpConfig.serversNTP" />
        </Typography.Text>
        <Form.List
          name={['ntp', 'hosts']}
          initialValue={[
            '0.ubuntu.pool.ntp.org',
            '1.ubuntu.pool.ntp.org',
            '2.ubuntu.pool.ntp.org',
            '3.ubuntu.pool.ntp.org',
          ]}
        >
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
                              'กรุณาตรวจสอบชื่อโฮสต์อีกครั้ง'
                            )
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    disabled={!isSetupDevice}
                    suffix={
                      <DeleteOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (!isSetupDevice) {
                            return;
                          }

                          remove(name);
                        }}
                      />
                    }
                    placeholder={
                      t('logManagement.placeholder', {
                        field: t(
                          'logManagement.hostname'
                        ),
                      }) as string
                    }
                  />
                </Form.Item>
              ))}

              <Button
                icon={<PlusOutlined className="mr-1" />}
                block
                type="dashed"
                onClick={() => add()}
                disabled={!isSetupDevice}
              >
                <IntlMessage id="logManagement.add" />
              </Button>
            </>
          )}
        </Form.List>
      </div>
    </Form>
  );
};
