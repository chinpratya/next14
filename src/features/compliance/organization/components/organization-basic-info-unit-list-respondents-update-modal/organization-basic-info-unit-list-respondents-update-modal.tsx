import { Form, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetOrganizationUnitListRespondents } from '../../api/get-organization-unit-list-respondents';
import { useUpdateOrganizationUnitListRespondents } from '../../api/update-organization-unit-list-respondents';
import { OrganizationBasicInfoUnitListRespondentsModalForm } from '../organization-basic-info-unit-list-respondents-modal-form';

export type OrganizationBasicInfoUnitListRespondentsUpdateModalProps =
  {
    organizationId: string;
    instituteId: string;
    respondentId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitListRespondentsUpdateModal =
  ({
    organizationId,
    instituteId,
    respondentId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitListRespondentsUpdateModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const { data, isLoading, isError } =
      useGetOrganizationUnitListRespondents(
        organizationId,
        instituteId,
        respondentId
      );

    const updateRespondent =
      useUpdateOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        respondentId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.respondent.update'
            ) as string,
          });
          onCancel();
        },
      });

    const onUpdateRespondent = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateRespondent.submit({
        ...data,
        ...values,
        department: values.department,
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
            <IntlMessage id="compliance.organization.detail.branch.listRespondents.edit.title" />{' '}
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
          loading: updateRespondent.isLoading,
        }}
        onOk={onUpdateRespondent}
      >
        <OrganizationBasicInfoUnitListRespondentsModalForm
          form={form}
        />
      </Modal>
    );
  };
