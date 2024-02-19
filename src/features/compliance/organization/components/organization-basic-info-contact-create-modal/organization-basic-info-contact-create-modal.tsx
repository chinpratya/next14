import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganizationBranchContact } from '../../api/create-organization-branch-contact';
import { useCreateOrganizationContact } from '../../api/create-organization-contact';
import { OrganizationBasicInfoContactModalForm } from '../organization-basic-info-contact-modal-form';

type OrganizationBasicInfoContactCreateModalProps = {
  organizationId: string;
  branchId?: string;
  open: boolean;
  onCancel: () => void;
  orgName?: string;
};

export const OrganizationBasicInfoContactCreateModal = ({
  organizationId,
  open,
  onCancel,
  branchId = '',
  orgName = '',
}: OrganizationBasicInfoContactCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'compliance.notification.organization.contact.add'
      ) as string,
    });
    onCancel();
  };

  const createContact = useCreateOrganizationContact({
    organizationId,
    onSuccess,
  });

  const createBranchContact =
    useCreateOrganizationBranchContact({
      organizationId,
      branchId,
      onSuccess,
    });

  const onCreateContact = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      department: values.department,
      description: values.description,
      email: values.email,
      name: values.name,
      position: values.position,
      tel: values.tel,
    };
    if (branchId) createBranchContact.submit(payload);
    else createContact.submit(payload);
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
    form.setFieldsValue({
      organizationID: orgName,
    });
  }, [open, form, orgName]);

  return (
    <Modal
      title={
        <IntlMessage id="compliance.organization.detail.contact.add" />
      }
      open={open}
      onCancel={onCancel}
      width={650}
      okButtonProps={{
        loading:
          createBranchContact.isLoading ||
          createContact.isLoading,
      }}
      onOk={onCreateContact}
    >
      <OrganizationBasicInfoContactModalForm
        form={form}
      />
    </Modal>
  );
};
