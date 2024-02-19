import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganizationUnitListRespondents } from '../../api/create-organization-unit-list-respondents';
import { OrganizationBasicInfoUnitListRespondentsModalForm } from '../organization-basic-info-unit-list-respondents-modal-form';

type OrganizationBasicInfoUnitListRespondentsCreateModalProps =
  {
    organizationId: string;
    instituteId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitListRespondentsCreateModal =
  ({
    organizationId,
    instituteId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitListRespondentsCreateModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const createRespondent =
      useCreateOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.respondent.add'
            ) as string,
          });
          onCancel();
        },
      });

    const onCreateRespondent = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      createRespondent.submit([
        {
          ...values,
        },
      ]);
    };

    useEffect(() => {
      if (!open) {
        form.resetFields();
      }
    }, [open, form]);

    return (
      <Modal
        title={
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.add.title" />
        }
        open={open}
        onCancel={onCancel}
        width={650}
        okButtonProps={{
          loading: createRespondent.isLoading,
        }}
        onOk={onCreateRespondent}
        okText={
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.add" />
        }
      >
        <OrganizationBasicInfoUnitListRespondentsModalForm
          form={form}
        />
      </Modal>
    );
  };
