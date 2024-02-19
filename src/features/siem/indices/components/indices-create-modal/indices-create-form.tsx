import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Slider,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { HiOutlineLightBulb } from 'react-icons/hi';

import { IntlMessage } from '@/components/util-components/intl-message';
import { IndicesTipStorageSize } from '@/features/log-management';
import { useToggle } from '@/hooks';
import { bytesToUnit } from '@/utils';
import validation from '@/utils/validation';

import {
  retentionOptions,
  timeNotificationOptions,
} from '../../share/constants';
import { IndiceStorage } from '../../types';

import { IndicesStorage } from './indices-storage';

export type IndicesCreateFormProps = {
  form: FormInstance;
  storage: IndiceStorage;
  totalStorage: number;
  storageInvalid?: boolean;
  onUsed: (used: number) => void;
  onChangeUnit: (unit: string) => void;
};

export const IndicesCreateForm = ({
  form,
  storage,
  totalStorage,
  storageInvalid,
  onChangeUnit,
  onUsed,
}: IndicesCreateFormProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();

  const dividerColor = storageInvalid
    ? '#ff6b72'
    : '#e6ebf1';

  const getMax = () => {
    const [value, unit] = bytesToUnit(storage.total);
    const currentUnit = storage.usedUnit;

    if (currentUnit === 'TB' && unit === 'TB')
      return value;
    else if (currentUnit === 'GB') {
      if (unit === 'TB') return 1024;
      else return value;
    } else if (currentUnit === 'MB') {
      if (unit === 'MB') return value;
      else return 1024;
    }

    return value;
  };

  const getMin = () => {
    if (['TB', 'GB'].includes(storage.usedUnit)) return 1;
    else if (storage.usedUnit === 'MB') return 512;
    else return 0;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={css`
        padding: 24px 0;

        .ant-form-item {
          padding: 0 24px;
        }
      `}
    >
      <Form.Item
        name="name"
        label={
          <IntlMessage id="logManagement.indices.name" />
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
              field: t('logManagement.indices.name'),
            }) as string
          }
        />
      </Form.Item>

      <Form.Item
        name="alias_name"
        label={
          <IntlMessage id="logManagement.indices.aliasName" />
        }
        tooltip={
          <IntlMessage id="siem.addIndices.aliasNameTooltip" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          {
            pattern: new RegExp(
              '^[a-z](?!.*_{2,})[a-z_]{3,8}[a-z]$'
            ),
            message: t(
              'logManagement.indices.alias.invalid.message'
            ) as string,
          },
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.indices.aliasName'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        name="description"
        label={
          <IntlMessage id="logManagement.indices.description" />
        }
      >
        <Input.TextArea
          rows={4}
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.indices.description'
              ),
            }) as string
          }
        />
      </Form.Item>

      <Divider style={{ borderColor: dividerColor }} />
      <Flex
        direction="column"
        className={css`
          padding: 0 24px;
        `}
      >
        <Typography.Text
          strong
          className={css`
            margin-bottom: 12px;
          `}
        >
          <IntlMessage id="logManagement.indices.storageSize" />
        </Typography.Text>
        <IndicesStorage
          used={storage.used}
          usedUnit={storage.usedUnit}
          total={bytesToUnit(totalStorage)[0]}
          free={storage.free}
          totalUnit={bytesToUnit(totalStorage)[1]}
          freeUnit={storage.freeUnit}
          storageInvalid={storageInvalid}
        />
        <Flex justify="space-between" className="mt-3">
          <Typography.Text strong>
            <IntlMessage id="logManagement.indices.use" />
          </Typography.Text>
          <Flex
            align="center"
            className={css`
              cursor: pointer;
              font-size: 10px;
              color: #704aff;

              svg {
                font-size: 14px;
              }
            `}
            onClick={() => toggle.preview()}
          >
            <HiOutlineLightBulb className="mr-1" />
            <IntlMessage id="logManagement.indices.suggestion.storage" />
          </Flex>
        </Flex>
        <Flex align="center" gap="md">
          <Slider
            min={getMin()}
            max={getMax()}
            value={storage.used}
            onChange={onUsed}
            className={css`
              width: 80%;
              margin: 12px 6px !important;

              :hover .ant-slider-track {
                background-color: #8b6cfd;
              }

              .ant-slider-track {
                background-color: #8b6cfd;
              }

              .ant-slider-handle {
                border-color: #8b6cfd;
                background-color: #fff;
              }
            `}
            disabled={storageInvalid}
          />
          <Flex align="center" gap="5px">
            <InputNumber
              className="w-50"
              value={storage.used}
              onChange={(value) => onUsed(value ?? 0)}
              min={getMin()}
              max={getMax()}
              disabled={storageInvalid}
            />
            <Select
              defaultValue={storage.usedUnit}
              className="w-50"
              onChange={onChangeUnit}
              options={[
                { label: 'MB', value: 'MB' },
                {
                  label: 'GB',
                  value: 'GB',
                  disabled: storage.freeUnit === 'MB',
                },
                {
                  label: 'TB',
                  value: 'TB',
                  disabled: storage.freeUnit !== 'TB',
                },
              ]}
              disabled={storageInvalid}
            />
          </Flex>
        </Flex>
        {storageInvalid && (
          <Typography.Text
            className={css`
              margin: 8px 0 -5px;
            `}
            type="danger"
          >
            <IntlMessage id="logManagement.indices.storage.invalid" />
          </Typography.Text>
        )}
      </Flex>

      <Divider style={{ borderColor: dividerColor }} />

      <Form.Item
        name="retention"
        label={
          <IntlMessage id="logManagement.indices.retentionDay" />
        }
        initialValue={3}
        rules={[validation.required('Retention')]}
      >
        <Select
          options={retentionOptions.map((item) => ({
            ...item,
            label: (
              <IntlMessage
                id={item.lang}
                options={{ value: item.value }}
              />
            ),
          }))}
        />
      </Form.Item>

      <Form.Item
        name="notify"
        label={
          <IntlMessage id="logManagement.indices.timeNotification" />
        }
        tooltip="Set time for notification in case of log not logged into the system of each Host."
        initialValue={30}
        rules={[validation.required('Time Notification')]}
      >
        <Select>
          {timeNotificationOptions.map((item) => (
            <Select.Option
              key={item.value}
              value={item.value}
            >
              <IntlMessage
                id={item.lang?.key as string}
                options={{ time: item.lang?.value }}
              />
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <IndicesTipStorageSize
        open={toggle.openPreview}
        onCancel={toggle.preview}
      />
    </Form>
  );
};
