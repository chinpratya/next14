import { css } from '@emotion/css';
import {
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

import { BackupDataCascader } from './components/backup-data-cascader';
import { NfsForm } from './components/nfs-form';
import { S3Form } from './components/s3-form';

type BackupDataFormProps = {
  form: FormInstance;
  isLoading?: boolean;
};

const schedulerOptions = [
  {
    key: 'logManagement.backupData.daily',
    value: 'DAILY',
  },
  {
    key: 'logManagement.backupData.weekly',
    value: 'WEEKLY',
  },
  {
    key: 'logManagement.backupData.monthly',
    value: 'MONTHLY',
  },
  {
    key: 'logManagement.backupData.quarterly',
    value: 'Quarterly',
  },
  {
    key: 'logManagement.backupData.once',
    value: 'ONCE',
  },
  {
    key: 'logManagement.backupData.custom',
    value: 'CUSTOM',
  },
];

export const BackupDataForm = ({
  form,
  isLoading,
}: BackupDataFormProps) => {
  const { t } = useTranslation();

  return (
    <Form
      disabled={isLoading}
      form={form}
      layout="vertical"
      className={css`
        .ant-form-item {
          padding: 0 24px;
        }
      `}
    >
      <Form.Item
        name="name"
        label={
          <IntlMessage id="logManagement.backupData.name" />
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
              field: t('logManagement.backupData.name'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['provider', 'type']}
        label={
          <IntlMessage id="logManagement.backupData.backupProvider" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
      >
        <Select
          options={[
            { label: 'NFS', value: 'NFS' },
            { label: 'S3', value: 'S3' },
          ]}
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t(
                'logManagement.backupData.backupProvider'
              ),
            }) as string
          }
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.provider?.type !==
          curValues.provider?.type
        }
      >
        {({ getFieldsValue }) => {
          const backupProvider =
            getFieldsValue().provider?.type;

          if (!backupProvider) return null;
          return (
            <>
              <Divider className="my-4" />
              {backupProvider === 'NFS' ? (
                <NfsForm />
              ) : (
                <S3Form />
              )}
            </>
          );
        }}
      </Form.Item>
      <Divider className="my-4" />

      <Form.Item
        name={['scheduler', 'type']}
        label={
          <IntlMessage id="logManagement.report.scheduler.title" />
        }
        initialValue="MONTHLY"
      >
        <Radio.Group>
          <Space direction="vertical">
            {schedulerOptions.map((item) => (
              <Radio value={item.value} key={item.value}>
                <IntlMessage id={item.key} />
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Divider className="my-4" />
      <Typography.Text
        className="pl-4 mb-3 d-block"
        strong
      >
        <IntlMessage id="logManagement.backupData.backup" />
      </Typography.Text>

      <Form.Item
        name={['backup', 'logs']}
        label={
          <IntlMessage id="logManagement.backupData.logs" />
        }
      >
        <BackupDataCascader
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.backupData.logs'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name={['backup', 'config']}
        label={
          <IntlMessage id="logManagement.backupData.config" />
        }
      >
        <Select
          allowClear
          options={[
            {
              label: t('logManagement.all'),
              value: 'all',
            },
          ]}
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.backupData.config'),
            }) as string
          }
        />
        {/* <BackupDataCascader
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t('logManagement.backupData.config'),
            }) as string
          }
        /> */}
      </Form.Item>
      <Form.Item
        name="enabled"
        label={
          <IntlMessage id="logManagement.dashboard.status" />
        }
        initialValue={true}
      >
        <Select
          options={[
            {
              label: (
                <IntlMessage id="logManagement.active" />
              ),
              value: true,
            },
            {
              label: (
                <IntlMessage id="logManagement.inactive" />
              ),
              value: false,
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
