import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateDataMappingOrganizations } from '../../api/create-data-mapping-organization';
import { OrganizationDetailForm } from '../organization-detail-form';

export type OrganizationCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const OrganizationCreateModal = ({
  open,
  onClose,
}: OrganizationCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const create = useCreateDataMappingOrganizations({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.organization.create'
        ) as string,
      });
      onClose();
    },
  });
  const onCreate = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    create.submit(value);
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage id="dataMapping.organization.create" />
      }
      onOk={onCreate}
      okButtonProps={{ loading: create.isLoading }}
      afterClose={() => form.resetFields()}
    >
      <OrganizationDetailForm form={form} />
    </Modal>
  );
};
