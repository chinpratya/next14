import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTags } from '../../../../data-mapping/tags';
import { TagsCreateForm } from '../tags-create-form';

type TagsCreateModalProps = {
  open: boolean;
  onClose: () => void;
  tagId?: string;
};
export const TagsCreateModal = ({
  open,
  onClose,
  tagId,
}: TagsCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'consentManagement.notification.tags.add'
      ) as string,
    });
    onClose();
  };

  const { submit, isLoading } = useCreateTags({
    onSuccess,
  });

  const onCreate = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    console.log('onCreate', form.getFieldsValue());
    submit(value);
  };

  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.tags.create" />
      }
      open={open}
      onCancel={onClose}
      onOk={onCreate}
      okButtonProps={{ loading: isLoading }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <TagsCreateForm form={form} tagId={tagId} />
    </Modal>
  );
};
