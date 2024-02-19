import { Form } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateOrganizationLv } from '../../api/create-organization-lv';
import { OrganizationLevel } from '../../types';
import { LvOrganizationDetail } from '../lv-organization-detail';

export type CreateLvOrganizationModalProps = {
  open: boolean;
  onClose: () => void;
  parentData?: OrganizationLevel;
};

export const CreateLvOrganizationModal = ({
  open,
  onClose,
  parentData,
}: CreateLvOrganizationModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createOrganizationLv = useCreateOrganizationLv({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.organization.lv.create'
        ) as string,
      });
      onClose();
    },
  });

  const onCreateLvOrganization = async () => {
    await form.validateFields();
    const values = form.getFieldsValue([
      'label_th',
      'label_en',
    ]);
    const payload = {
      ...values,
      underId: parentData?.levelId,
    };

    createOrganizationLv.submit(payload);
  };

  useEffect(() => {
    if (parentData) {
      const labelLevel = `Lv. ${
        _.get(parentData, 'level', 0) + 1
      }`;
      const underLabel = `${_.get(
        parentData,
        'label_th',
        ''
      )}`;

      form.setFieldsValue({
        level: labelLevel,
        underName: `${underLabel}(Lv. ${_.get(
          parentData,
          'level',
          1
        )})`,
      });
    }

    if (!open) {
      form.resetFields();
    }

    return () => {
      form.resetFields();
    };
  }, [parentData, open, form]);

  return (
    <Modal
      title={
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.create.title" />
      }
      open={open}
      onOk={onCreateLvOrganization}
      onCancel={onClose}
      okButtonProps={{
        loading: createOrganizationLv.isLoading,
      }}
    >
      <LvOrganizationDetail form={form} />
    </Modal>
  );
};
