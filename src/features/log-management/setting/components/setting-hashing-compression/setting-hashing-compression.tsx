import { SettingOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Modal,
  Button,
  Form,
  Select,
  Typography,
} from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useUpdateSetting } from '../../api/update-setting';
import { Setting, Stratum } from '../../types';

import { CompressionAdviceModal } from './components/compression-advice-modal';
import { HashingAdviceModal } from './components/hashing-advice-modal';

type SettingHashingCompressionProps = {
  setting?: Setting;
  stratum?: Stratum;
  canUpdate?: boolean;
};

export const SettingHashingCompression = ({
  setting,
  stratum,
  canUpdate,
}: SettingHashingCompressionProps) => {
  const [form] = Form.useForm();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const updateSetting = useUpdateSetting({
    settingId: setting?.id as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      handleEdit();
    },
  });

  const [editor, setEditor] = useState(false);

  const log = setting?.log;

  const handleEdit = () => setEditor((prev) => !prev);

  const onSubmit = () => {
    Modal.confirm({
      title: (
        <IntlMessage id="logManagement.setting.confirmation" />
      ),
      content: (
        <IntlMessage id="logManagement.setting.confirmation.content" />
      ),
      centered: true,
      maskClosable: true,
      onOk: async () => {
        const values = form.getFieldsValue();
        updateSetting.submit({
          ...setting,
          ...values,
          timezone: !!setting?.timezone
            ? setting.timezone
            : stratum?.timezone.replace(
                /(\r\n|\n|\r)/gm,
                ''
              ),
          hosts: setting?.hosts ?? [],
        });
      },
    });
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="mb-3"
      >
        <Typography.Title
          level={4}
          className="font-weight-bold mb-0"
        >
          <IntlMessage id="logManagement.setting.hashingAndCompression" />
        </Typography.Title>
        {canUpdate &&
          (editor ? (
            <Button
              type="primary"
              onClick={onSubmit}
              loading={updateSetting.isLoading}
            >
              <IntlMessage id="logManagement.update" />
            </Button>
          ) : (
            <Button
              icon={<SettingOutlined />}
              onClick={handleEdit}
            />
          ))}
      </Flex>

      <Form
        form={form}
        layout="vertical"
        className={css`
          label {
            width: 100%;
          }

          .ant-select-disabled.ant-select:not(
              .ant-select-customize-input
            )
            .ant-select-selector {
            color: ${CYBER_DISABLED_TEXT_COLOR};
          }
        `}
        initialValues={{
          log: {
            hash_type:
              log && !!log.hash_type
                ? log.hash_type
                : 'md5',
            compression_type:
              log && log.compression_type
                ? log.compression_type
                : 'gz',
          },
        }}
        disabled={!editor}
      >
        <Form.Item
          name={['log', 'hash_type']}
          label={
            <Flex
              className="w-100"
              align="center"
              justify="space-between"
            >
              <Typography.Text>
                <IntlMessage id="logManagement.setting.formatHashing" />
              </Typography.Text>

              <span
                className={css`
                  color: #704aff !important;
                  font-size: 12px;
                  cursor: pointer;
                `}
                onClick={toggle.preview}
              >
                <HiOutlineLightBulb className="mr-1" />
                <IntlMessage id="logManagement.setting.hashTips.title" />
              </span>
            </Flex>
          }
        >
          <Select
            options={[
              { label: 'MD5', value: 'md5' },
              { label: 'SHA1', value: 'sha1' },
              { label: 'SHA256', value: 'sha256' },
              { label: 'SHA512', value: 'sha512' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={['log', 'compression_type']}
          label={
            <Flex
              className="w-100"
              align="center"
              justify="space-between"
            >
              <Typography.Text>
                <IntlMessage id="logManagement.setting.formatCompression" />
              </Typography.Text>

              <span
                className={css`
                  color: #704aff !important;
                  font-size: 12px;
                  cursor: pointer;
                `}
                onClick={toggle.choose}
              >
                <HiOutlineLightBulb className="mr-1" />
                <IntlMessage id="logManagement.setting.compressionTips.title" />
              </span>
            </Flex>
          }
        >
          <Select
            options={[
              { label: 'GZ', value: 'gz' },
              { label: 'LZO', value: 'lzo' },
              { label: 'ZIP', value: 'zip' },
              { label: 'LZ4', value: 'lz4' },
            ]}
          />
        </Form.Item>
      </Form>

      <HashingAdviceModal
        open={toggle.openPreview}
        onCancel={toggle.preview}
      />
      <CompressionAdviceModal
        open={toggle.openChoose}
        onCancel={toggle.choose}
      />
    </>
  );
};
