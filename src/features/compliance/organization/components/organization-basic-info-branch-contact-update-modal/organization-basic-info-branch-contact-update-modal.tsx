import { Form, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateOrganizationBranchContact } from '../../api/update-organization-branch-contact';
import { OrganizationContact } from '../../types';
import { OrganizationBasicInfoContactModalForm } from '../organization-basic-info-contact-modal-form';

type OrganizationBasicInfoBranchContactUpdateModalProps =
  {
    organizationId: string;
    branchId: string;
    contactId: string;
    page: number;
    pageSize: number;
    open: boolean;
    data?: OrganizationContact;
    onCancel: () => void;
    orgName?: string;
  };

export const OrganizationBasicInfoBranchContactUpdateModal =
  ({
    organizationId,
    contactId,
    page,
    pageSize,
    open,
    branchId,
    data,
    onCancel,
    orgName,
  }: OrganizationBasicInfoBranchContactUpdateModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const updateBranchContact =
      useUpdateOrganizationBranchContact({
        organizationId,
        branchId,
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

    const onUpdateBranchContact = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateBranchContact.submit({
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
          loading: updateBranchContact.isLoading,
        }}
        onOk={onUpdateBranchContact}
      >
        <OrganizationBasicInfoContactModalForm
          form={form}
        />
      </Modal>
    );
  };
