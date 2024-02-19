import { css } from '@emotion/css';
import { Form, FormInstance, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import validation from '@/utils/validation';

import { Monitor, NotifyList } from '../../types';

import { NotificationGroupSeverityForm } from './notification-group-severity-form';

type IndicesNotificationGroupFormProps = {
  form: FormInstance;
  isEditor?: boolean;
  notifyList: NotifyList[];
  monitor?: Monitor;
};

const notificationSettingOptions = [
  {
    label: (
      <IntlMessage id="logManagement.indices.everyFifteenMinutes" />
    ),
    value: 15,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.everyThirtyMinutes" />
    ),
    value: 30,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.everyOneHaftHours" />
    ),
    value: 90,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.everyFourHours" />
    ),
    value: 240,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.everyTwelveHours" />
    ),
    value: 720,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.everyTwelveFourHours" />
    ),
    value: 1440,
  },
];

const notificationDelayOptions = [
  {
    label: (
      <IntlMessage id="logManagement.indices.delayFifteenMinutes" />
    ),
    value: 15,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.delayThirtyMinutes" />
    ),
    value: 30,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.delayOneHaftHours" />
    ),
    value: 90,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.delayFourHours" />
    ),
    value: 240,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.delayTwelveHours" />
    ),
    value: 720,
  },
  {
    label: (
      <IntlMessage id="logManagement.indices.delayTwelveFourHours" />
    ),
    value: 1440,
  },
];

export const IndicesNotificationGroupForm = ({
  form,
  isEditor = false,
  notifyList,
  monitor,
}: IndicesNotificationGroupFormProps) => {
  const { t } = useTranslation();

  const typeConditionOptions = [
    {
      label: t('logManagement.indices.conditionEvent'),
      value: 'Event',
    },
    {
      label: t('logManagement.indices.storage'),
      value: 'Storage',
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      className={css`
        .ant-input-disabled,
        .ant-select-disabled.ant-select:not(
            .ant-select-customize-input
          )
          .ant-select-selector {
          color: ${CYBER_DISABLED_TEXT_COLOR};
        }
      `}
    >
      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.notificationName" />
        }
        name="hostname"
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.notificationGroup" />
        }
        name={['notify', 0]}
        rules={[
          validation.required('Notification group'),
        ]}
      >
        <Select options={notifyList ?? []} />
      </Form.Item>

      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.description" />
        }
        name="description"
      >
        <Input.TextArea
          rows={3}
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.indices.description'
              ),
            }) as string
          }
        />
      </Form.Item>

      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.condition" />
        }
        name="monitor_type"
      >
        <Select
          options={typeConditionOptions}
          disabled={isEditor}
        />
      </Form.Item>

      {monitor?.monitor_type === 'Storage' && (
        <NotificationGroupSeverityForm
          form={form}
          monitor={monitor}
        />
      )}

      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.notificationTime" />
        }
        name="interval_time"
        rules={[
          validation.required('Notification Setting'),
        ]}
        className={css`
          margin-top: 24px;
        `}
      >
        <Select options={notificationSettingOptions} />
      </Form.Item>

      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.notificationDelay" />
        }
        name="internal_ignore"
        rules={[
          validation.required('Notification Delay'),
        ]}
      >
        <Select options={notificationDelayOptions} />
      </Form.Item>
    </Form>
  );
};
