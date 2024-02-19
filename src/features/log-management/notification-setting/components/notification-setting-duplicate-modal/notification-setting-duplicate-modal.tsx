import { Form, Input, Modal } from 'antd';
import { t } from 'i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';

import { useDuplicateNotify } from '../../api/duplicate-notify';
import { Notify } from '../../types';

type NotificationSettingDuplicateModalProps = {
  open: boolean;
  notify: Notify;
  onCancel: () => void;
};

export const NotificationSettingDuplicateModal = ({
  open,
  notify,
  onCancel,
}: NotificationSettingDuplicateModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    onCancel();
    form.resetFields();
  };

  const { submit, isLoading } = useDuplicateNotify({
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit({ ...values, id: notify._id });
  };

  return (
    <Modal
      title={<IntlMessage id="logManagement.duplicate" />}
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      okButtonProps={{ loading: isLoading }}
      centered
      afterClose={() => form.resetFields()}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage id="logManagement.notificationSetting.name" />
          }
          initialValue={notify?.name}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t('logManagement.name'),
              }) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
