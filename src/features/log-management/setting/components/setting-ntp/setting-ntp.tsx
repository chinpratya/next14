import { SettingOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Modal, Button, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useUpdateSetting } from '../../api/update-setting';
import { Setting, Stratum } from '../../types';

import { SettingNtpForm } from './setting-ntp-form';

type SettingNtpProps = {
  setting?: Setting;
  stratum?: Stratum;
  canUpdate?: boolean;
};

export const SettingNtp = ({
  setting,
  stratum,
  canUpdate,
}: SettingNtpProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const [loading, toggleLoading] = useToggle();

  const [editor, setEditor] = useState(false);

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

  const handleEdit = () => setEditor((prev) => !prev);

  const onSubmit = async () => {
    try {
      toggleLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      Modal.confirm({
        title: (
          <IntlMessage id="logManagement.setting.confirmation" />
        ),
        content: (
          <IntlMessage id="logManagement.setting.confirmation.content" />
        ),
        maskClosable: true,
        centered: true,
        onOk: async () => {
          const payload = {
            ...setting,
            timezone: values.timezone,
            hosts: values.device ? values.hosts : [],
          };
          updateSetting.submit(payload);
        },
      });
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (setting && stratum) {
      form.setFieldsValue({
        timestamp: dayjs(
          stratum.timestamp.replace(/(\r\n|\n|\r)/gm, '')
        ),
        timezone: !!setting.timezone
          ? setting.timezone
          : stratum.timezone.replace(
              /(\r\n|\n|\r)/gm,
              ''
            ),
        stat: stratum.stat,
        hosts: setting.hosts,
        device:
          setting.hosts && setting.hosts.length > 0
            ? true
            : false,
      });
    }
  }, [form, setting, stratum]);

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
          {editor ? (
            <IntlMessage id="logManagement.setting.updateNtpSetting" />
          ) : (
            <IntlMessage id="logManagement.setting.ntpSetting" />
          )}
        </Typography.Title>

        {canUpdate &&
          (editor ? (
            <Button
              type="primary"
              onClick={onSubmit}
              loading={updateSetting.isLoading || loading}
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

      <SettingNtpForm form={form} editor={editor} />
    </>
  );
};
