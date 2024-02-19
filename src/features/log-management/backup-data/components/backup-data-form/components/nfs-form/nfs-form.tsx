import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

export const NfsForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name={['provider', 'host']}
        label={
          <IntlMessage id="logManagement.backupData.host" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.backupData.host'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'username']}
        label={
          <IntlMessage id="logManagement.username" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.username'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'password']}
        label={
          <IntlMessage id="logManagement.password" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input.Password
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.password'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'name']}
        label={
          <IntlMessage id="logManagement.dashboard.path" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.dashboard.path'),
            }) as string
          }
        />
      </Form.Item>
    </>
  );
};
