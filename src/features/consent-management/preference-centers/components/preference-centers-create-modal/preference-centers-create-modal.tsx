import { Form } from 'antd';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreatePreferenceCenters } from '../../api/create-preference-centers';
import { PreferenceCentersBasicInfo } from '../preference-centers-basic-info';
import { PreferenceCentersOrganization } from '../preference-centers-organization';

export type PreferenceCentersCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const PreferenceCentersCreateModal = ({
  open,
  onClose,
}: PreferenceCentersCreateModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createPreferenceCenters =
    useCreatePreferenceCenters({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message:
            'Create Preference Center Successfully.',
        });
        form.resetFields();
        onClose();
      },
    });

  const onCreatePreferenceCenters = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createPreferenceCenters.submit(values);
  };

  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.preferenceCenters.create" />
      }
      open={open}
      onCancel={onClose}
      onOk={onCreatePreferenceCenters}
      okButtonProps={{
        loading: createPreferenceCenters.isLoading,
      }}
    >
      <PreferenceCentersBasicInfo form={form} />
      <PreferenceCentersOrganization form={form} />
    </Modal>
  );
};
