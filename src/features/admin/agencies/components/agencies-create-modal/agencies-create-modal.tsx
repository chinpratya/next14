import { Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateAgencies } from '../../api/create-agencies';
import { AgenciesForm } from '../agencies-form/agencies-form';

type AgenciesCreateModalProps = {
  open: boolean;
  onCancel?: () => void;
};

export const AgenciesCreateModal = ({
  open,
  onCancel,
}: AgenciesCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { isLoading, submit } = useCreateAgencies({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.agencies.create'
        ) as string,
      });
      onCancel?.();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    submit({ ...value, type_group: 'agencies' });
  };

  return (
    <Modal
      title={
        <IntlMessage id="admin.userManagement.agencies.create.title" />
      }
      centered
      open={open}
      okButtonProps={{ loading: isLoading }}
      onOk={onSubmit}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
    >
      <AgenciesForm form={form} />
    </Modal>
  );
};
