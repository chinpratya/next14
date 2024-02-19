import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useCreateBackupData } from '../../api/create-backup-data';
import { BackupDataForm } from '../backup-data-form';

type BackupDataCreateModalProps = {
  open: boolean;
  onCancel?: () => void;
};

export const BackupDataCreateModal = ({
  open,
  onCancel,
}: BackupDataCreateModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const creatBackupData = useCreateBackupData({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.created'
        ) as string,
      });
      onCancel?.();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const { config, logs } = values.backup;

    creatBackupData.submit({
      ...values,
      backup: { config: !!config, logs: !!logs },
    });
  };

  return (
    <Modal
      width={670}
      open={open}
      onCancel={onCancel}
      centered
      title={
        <IntlMessage id="logManagement.backupData.create.title" />
      }
      onOk={onSubmit}
      okText={<IntlMessage id="logManagement.create" />}
      bodyStyle={{ padding: '24px 0' }}
      okButtonProps={{
        loading: creatBackupData.isLoading,
      }}
      afterClose={() => form.resetFields()}
      destroyOnClose
    >
      <BackupDataForm form={form} />
    </Modal>
  );
};
