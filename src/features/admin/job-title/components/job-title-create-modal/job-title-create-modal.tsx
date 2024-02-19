import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateJobTitle } from '../../api/create-job-title';
import { JobTitleFormInfo } from '../job-title-form-info';

type JobTitleCreateModalProps = {
  open: boolean;
  toggleModal: () => void;
};

export const JobTitleCreateModal = ({
  open,
  toggleModal,
}: JobTitleCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onCreateSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.jobTitle.create'
      ) as string,
    });
    toggleModal();
    form.resetFields();
  };

  const { submit, isLoading } = useCreateJobTitle({
    onSuccess: onCreateSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();

    submit(form.getFieldsValue());
  };

  return (
    <Modal
      title={
        <IntlMessage id="admin.userManagement.jobTitle.create.title" />
      }
      open={open}
      onCancel={() => toggleModal()}
      onOk={() => onSubmit()}
      okButtonProps={{ loading: isLoading }}
    >
      <JobTitleFormInfo form={form} />
    </Modal>
  );
};
