import { Form, Modal } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useUpdateAliasHost } from '@/features/log-management';
import { useNotifications } from '@/stores/notifications';

import { Monitor } from '../../types';
import { IndicesAliasHostForm } from '../indices-alias-host-form';

type IndicesEditAliasHostModalProps = {
  open: boolean;
  data?: Monitor;
  onCancel: () => void;
};

export const IndicesEditAliasHostModal = ({
  open,
  data,
  onCancel,
}: IndicesEditAliasHostModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useUpdateAliasHost({
    hostId: data?._id as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      onCancel();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const { alias_name } = form.getFieldsValue();
    submit({ alias_name });
  };

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.indices.host.edit.title" />
      }
      open={open}
      centered
      onOk={onSubmit}
      onCancel={onCancel}
      okButtonProps={{ loading: isLoading }}
      okText={<IntlMessage id="logManagement.update" />}
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      afterClose={() => form.resetFields()}
    >
      <IndicesAliasHostForm form={form} isEditor />
    </Modal>
  );
};
