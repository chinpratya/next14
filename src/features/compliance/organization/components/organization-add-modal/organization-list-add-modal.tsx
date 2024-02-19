import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganization } from '../../api/create-organization';
import { OrganizationAddUpdateForm } from '../organization-add-update-form';

type OrganizationListAddModalProps = {
  open: boolean;
  toggleModal: () => void;
};

export const OrganizationListAddModal = ({
  open,
  toggleModal,
}: OrganizationListAddModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'compliance.notification.organization.create'
      ) as string,
    });
    form.resetFields();
    toggleModal();
  };

  const { submit, isLoading } = useCreateOrganization({
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const [industryGroup, businessCategory] =
      values?.['industryGroup'] ?? [];

    const payload = [
      {
        name: values.name,
        industryGroup,
        businessCategory,
        orgGroup: values?.orgGroup,
      },
    ];

    submit(payload);
  };

  return (
    <Modal
      open={open}
      title={
        <IntlMessage id="compliance.organization.add" />
      }
      onOk={onSubmit}
      onCancel={() => toggleModal()}
      okButtonProps={{ loading: isLoading }}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <OrganizationAddUpdateForm form={form} />
    </Modal>
  );
};
