import { Form, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateOrganizationContact } from '../../api/update-organization-contact';
import { OrganizationContact } from '../../types';
import { OrganizationBasicInfoContactModalForm } from '../organization-basic-info-contact-modal-form';

type OrganizationBasicInfoContactUpdateModalProps = {
  organizationId: string;
  contactId: string;
  page: number;
  pageSize: number;
  open: boolean;
  data?: OrganizationContact;
  onCancel: () => void;
  orgName?: string;
};

export const OrganizationBasicInfoContactUpdateModal = ({
  organizationId,
  contactId,
  page,
  pageSize,
  open,
  data,
  onCancel,
  orgName,
}: OrganizationBasicInfoContactUpdateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const editPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions[
        'pdpakit:compliance:organization:update'
      ],
    ],
  });
  const updateContact = useUpdateOrganizationContact({
    organizationId,
    contactId,
    page,
    pageSize,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.organization.contact.update'
        ) as string,
      });
      onCancel();
    },
  });

  const onUpdateContact = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateContact.submit({
      ...data,
      ...values,
      organizationID: organizationId,
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        organizationID: orgName,
      });
    }
  }, [data, form, orgName]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={
        <>
          <IntlMessage id="compliance.organization.detail.contact.edit" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      open={open}
      onCancel={onCancel}
      width={650}
      okButtonProps={{
        loading: updateContact.isLoading,
        disabled: !editPermission.isAllow,
      }}
      onOk={onUpdateContact}
    >
      <OrganizationBasicInfoContactModalForm
        form={form}
      />
    </Modal>
  );
};
