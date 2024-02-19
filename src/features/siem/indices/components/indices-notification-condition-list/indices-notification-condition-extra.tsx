import { Button, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useCreateMonitor } from '../../api/create-monitor';
import { IndicesNotificationGroupModal } from '../indices-notification-group-modal';

export const IndicesNotificationConditionExtra = () => {
  const router = useRouter();
  const toggle = useToggle();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const indiceId = router.query.indiceId as string;

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    toggle.create();
    form.resetFields();
  };

  const { submit, isLoading } = useCreateMonitor({
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const payload = {
      ...values,
      indices: indiceId,
      module: 'SIEM',
      internal_ignore: 10,
      life_cycle: {},
    };

    submit(payload);
  };

  return (
    <>
      <Button type="primary" onClick={toggle.create}>
        <IntlMessage id="siem.indices.notificationCreateAndEdit.add" />
      </Button>
      <IndicesNotificationGroupModal
        notifyList={[]}
        open={toggle.openCreate}
        onSubmit={onSubmit}
        onClose={toggle.create}
        form={form}
        loading={isLoading}
      />
    </>
  );
};
