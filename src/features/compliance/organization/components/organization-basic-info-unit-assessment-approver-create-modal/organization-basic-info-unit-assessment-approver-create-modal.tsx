import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganizationUnitAssessmentApprover } from '../../api/create-organization-unit-assessment-approver';
import { OrganizationBasicInfoUnitAssessmentApproverModalForm } from '../organization-basic-info-unit-assessment-approver-modal-form';

export type OrganizationBasicInfoUnitAssessmentApproverCreateModalProps =
  {
    organizationId: string;
    instituteId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitAssessmentApproverCreateModal =
  ({
    organizationId,
    instituteId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitAssessmentApproverCreateModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const createApprover =
      useCreateOrganizationUnitAssessmentApprover({
        organizationId,
        instituteId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.approver.add'
            ) as string,
          });
          onCancel();
        },
      });

    const onCreateApprover = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      createApprover.submit({
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
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.add.title" />
        }
        open={open}
        onCancel={onCancel}
        width={650}
        okButtonProps={{
          loading: createApprover.isLoading,
        }}
        onOk={onCreateApprover}
        okText={
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.add" />
        }
      >
        <OrganizationBasicInfoUnitAssessmentApproverModalForm
          form={form}
        />
      </Modal>
    );
  };
