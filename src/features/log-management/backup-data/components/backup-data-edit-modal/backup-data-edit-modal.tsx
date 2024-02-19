import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useGetBackupData } from '../../api/get-backup-data';
import { useUpdateBackupData } from '../../api/update-backup-data';
import { BackupDataForm } from '../backup-data-form';

type BackupDataEditModalProps = {
  open: boolean;
  backupDataId?: string;
  onCancel?: () => void;
};

export const BackupDataEditModal = ({
  open,
  backupDataId,
  onCancel,
}: BackupDataEditModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } = useGetBackupData({
    backupDataId: backupDataId as string,
  });

  const updateBackupData = useUpdateBackupData({
    backupDataId: data?.id as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      onCancel?.();
    },
  });

  const providerValue = Form.useWatch(
    ['provider', 'type'],
    form
  );

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const { config, logs } = values.backup;

    updateBackupData.submit({
      ...values,
      backup: { config: !!config, logs: !!logs },
    });
  };

  useEffect(() => {
    if (providerValue !== data?.provider.type) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        provider: {
          type: providerValue,
          host: providerValue === 'S3' ? undefined : '',
          username: undefined,
          password: undefined,
          name: undefined,
        },
      });
    } else {
      form.setFieldValue(
        ['provider', 'host'],
        providerValue === 'S3'
          ? undefined
          : data?.provider.host ?? ''
      );
    }
  }, [providerValue]);

  useEffect(() => {
    if (data && open) {
      const { config, logs } = data.backup;

      form.setFieldsValue({
        ...data,
        backup: {
          config: !!config ? ['all'] : undefined,
          logs: !!logs ? ['all'] : undefined,
        },
      });
    }
  }, [data, form, open]);

  return (
    <Modal
      width={670}
      open={open}
      onCancel={onCancel}
      centered
      title={
        <IntlMessage id="logManagement.backupData.edit.title" />
      }
      onOk={onSubmit}
      okText={<IntlMessage id="logManagement.edit" />}
      bodyStyle={{ padding: '24px 0' }}
      okButtonProps={{
        loading: updateBackupData.isLoading,
      }}
      isError={isError}
      afterClose={() => form.resetFields()}
      destroyOnClose
    >
      <BackupDataForm form={form} isLoading={isLoading} />
    </Modal>
  );
};
