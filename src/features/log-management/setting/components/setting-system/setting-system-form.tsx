import { css } from '@emotion/css';
import { Form, FormInstance, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import { validation } from '@/utils';

type SettingSystemFormProps = {
  form: FormInstance;
  editor?: boolean;
};

export const SettingSystemForm = ({
  form,
  editor,
}: SettingSystemFormProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const isModule = router.pathname.split('/')[3];
  const engineOptions = [
    { label: 'Syslog', value: 'collector-syslog' },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={!editor}
      className={css`
        .ant-input-disabled {
          color: ${CYBER_DISABLED_TEXT_COLOR};
        }
      `}
    >
      <Form.Item
        label={
          <IntlMessage id="logManagement.organization" />
        }
        name="organization"
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.organization'),
            }) as string
          }
          disabled
        />
      </Form.Item>
      <Form.Item
        label={<IntlMessage id="logManagement.email" />}
        name="email"
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.email'),
            }) as string
          }
          disabled
        />
      </Form.Item>
      <Form.Item
        label={<IntlMessage id="logManagement.engine" />}
        name="engine"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
      >
        <Select
          mode="multiple"
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.engine'),
            }) as string
          }
          options={[
            ...engineOptions,
            {
              label: 'Logstash',
              value: 'collector-logstash',
              disabled: isModule === 'log-management',
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
