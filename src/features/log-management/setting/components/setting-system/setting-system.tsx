import { SettingOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Button, Form, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useUpdateSetting } from '../../api/update-setting';
import { Setting } from '../../types';

import { SettingSystemForm } from './setting-system-form';

type SettingSystemProps = {
  setting?: Setting;
  canUpdate?: boolean;
};

export const SettingSystem = ({
  setting,
  canUpdate,
}: SettingSystemProps) => {
  const { t } = useTranslation();
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
          updateSetting.submit({ ...setting, ...values });
        },
      });
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (setting) {
      form.setFieldsValue({
        organization: setting?.organization,
        email: setting?.email,
        engine: setting?.engine,
      });
    }
  }, [form, setting]);

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
          <IntlMessage id="logManagement.setting.information" />
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

      <SettingSystemForm form={form} editor={editor} />
    </>
  );
};
