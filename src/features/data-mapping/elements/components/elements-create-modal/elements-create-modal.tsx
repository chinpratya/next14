import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateDataElement } from '../../api/create-data-element';
import { ElementsForm } from '../elements-form';

type ElementsCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const ElementsCreateModal = ({
  open,
  onCancel,
}: ElementsCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateDataElement({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataElement.create'
        ) as string,
      });
      onCancel();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      title={
        <IntlMessage id="dataMapping.dataElement.create.title" />
      }
      width={500}
      afterClose={() => form.resetFields()}
      okButtonProps={{ loading: isLoading }}
    >
      <ElementsForm form={form} />
    </Modal>
  );
};
