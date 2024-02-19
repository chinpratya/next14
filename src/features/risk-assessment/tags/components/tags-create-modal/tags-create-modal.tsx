import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useAuth } from '@/stores/auth';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTag } from '../../api/create-tag';

export type TagsCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const TagsCreateModal = ({
  open,
  onClose,
}: TagsCreateModalProps) => {
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
          tokens.riskAssessment.tags.notifications.create
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
        <IntlMessage
          id={tokens.riskAssessment.tags.create}
        />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => form.resetFields()}
      onOk={handleCreateTag}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.riskAssessment.tags.name}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(tokens.riskAssessment.tags.nameRequired)
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
