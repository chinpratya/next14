import { Flex } from '@mantine/core';
import { Form, Input, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

import { regionOptions } from './region-options';

export const S3Form = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name={['provider', 'host']}
        label={
          <IntlMessage id="logManagement.indices.host" />
        }
        rules={[validation.trim()]}
        initialValue="s3.amazonaws.com"
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.indices.host'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'name']}
        label="Bucket"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input placeholder="Bucket" />
      </Form.Item>
      <Form.Item
        name={['provider', 'username']}
        label="Access Key"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder="Access Key"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'password']}
        label="Secret Key"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder="Secret Key"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'region']}
        label={
          <IntlMessage id="logManagement.backupData.region" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Select
          options={regionOptions.map((item) => ({
            label: (
              <Flex justify="space-between">
                {item.label}
                <Typography.Text
                  style={{ color: '#d0d0d0' }}
                >
                  {item.value}
                </Typography.Text>
              </Flex>
            ),
            value: item.value,
          }))}
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.backupData.region'),
            }) as string
          }
        />
      </Form.Item>
    </>
  );
};
