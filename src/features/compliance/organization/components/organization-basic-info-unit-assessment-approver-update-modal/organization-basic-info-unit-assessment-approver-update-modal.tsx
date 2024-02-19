import { Form, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetOrganizationUnitAssessmentApprover } from '../../api/get-organization-unit-assessment-approver';
import { useUpdateOrganizationUnitAssessmentApprover } from '../../api/update-organization-unit-assessment-approver';
import { OrganizationBasicInfoUnitAssessmentApproverModalForm } from '../organization-basic-info-unit-assessment-approver-modal-form';

export type OrganizationBasicInfoUnitAssessmentApproverUpdateModalProps =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitAssessmentApproverUpdateModal =
  ({
    organizationId,
    instituteId,
    approverId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitAssessmentApproverUpdateModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const { data, isLoading, isError } =
      useGetOrganizationUnitAssessmentApprover(
        organizationId,
        instituteId,
        approverId
      );

    const updateApprover =
      useUpdateOrganizationUnitAssessmentApprover({
        organizationId,
        instituteId,
        approverId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.approver.update'
            ) as string,
          });
          onCancel();
        },
      });

    const onUpdateApprover = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateApprover.submit({
        ...data,
        ...values,
      });
    };

    useEffect(() => {
      if (data) {
        form.setFieldsValue(data);
      }
    }, [data, form]);

    useEffect(() => {
      if (!open) {
        form.resetFields();
      }
    }, [open, form]);

    return (
      <Modal
        title={
          <>
            <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.edit.title" />{' '}
            <Typography.Text type="secondary">
              {data?.name}
            </Typography.Text>
          </>
        }
        isError={isError}
        loading={isLoading}
        open={open}
        onCancel={onCancel}
        width={650}
        okButtonProps={{
          loading: updateApprover.isLoading,
        }}
        onOk={onUpdateApprover}
      >
        <OrganizationBasicInfoUnitAssessmentApproverModalForm
          form={form}
        />
      </Modal>
    );
  };
