import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganizationUnit } from '../../api/create-organization-unit';

import { OrganizationBasicInfoUnitCreateForm } from './organization-basic-info-unit-create-form';

type OrganizationBasicInfoUnitCreateModalProps = {
  organizationId: string;
  open: boolean;
  onCancel: () => void;
};

export const OrganizationBasicInfoUnitCreateModal = ({
  organizationId,
  open,
  onCancel,
}: OrganizationBasicInfoUnitCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createUnit = useCreateOrganizationUnit({
    organizationId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.organization.branch.add'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateUnit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createUnit.submit({
      ...values,
    });
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={
        <IntlMessage id="compliance.organization.detail.branch.add" />
      }
      open={open}
      onCancel={onCancel}
      okButtonProps={{
        loading: createUnit.isLoading,
      }}
      onOk={onCreateUnit}
    >
      <OrganizationBasicInfoUnitCreateForm form={form} />
    </Modal>
  );
};
