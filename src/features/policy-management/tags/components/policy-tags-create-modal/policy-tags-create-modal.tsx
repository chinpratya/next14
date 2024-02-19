import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/stores/auth';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTag } from '../../api/create-tag';

export type PolicyTagsCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const PolicyTagsCreateModal = ({
  open,
  onClose,
}: PolicyTagsCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { organizationName } = useAuth();

  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateTag({
    onSuccess: () => {
      onClose();
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.tags.create'
        ) as string,
      });
    },
  });

  const handleCreateTag = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  useEffect(() => {
    if (organizationName && open) {
      form.setFieldsValue({
        organization: organizationName,
      });
    }
  }, [organizationName, form, open]);

  return (
    <Modal
      title={
        <IntlMessage id="policyManagement.tag.create.title" />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => form.resetFields()}
      okText={
        <IntlMessage id="policyManagement.tag.create" />
      }
      onOk={handleCreateTag}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="policyManagement.tag.name" />
          }
          name="name"
          rules={[
            validation.required(
              t('policyManagement.tag.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="policyManagement.tag.organization" />
          }
          name="organization"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};