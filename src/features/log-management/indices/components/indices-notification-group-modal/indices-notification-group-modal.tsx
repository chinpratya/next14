import { FormInstance } from 'antd';
import { useEffect } from 'react';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';

import { Monitor, NotifyList } from '../../types';

import { IndicesNotificationGroupForm } from './indices-notification-group-form';

type IndicesNotificationGroupModalProps = {
  open: boolean;
  form: FormInstance;
  isEditor?: boolean;
  readonly?: boolean;
  loading?: boolean;
  data?: Monitor;
  notifyList: NotifyList[];
  onSubmit?: () => void;
  onClose?: () => void;
};

export const IndicesNotificationGroupModal = ({
  open,
  form,
  loading,
  data,
  notifyList,
  isEditor,
  readonly,
  onSubmit,
  onClose,
}: IndicesNotificationGroupModalProps) => {
  useEffect(() => {
    if (data)
      form.setFieldsValue({
        ...data,
        hostname: !!data.hostname
          ? data.hostname
          : data.monitor_type,
      });
  }, [data, form]);

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.indices.notificationConditions" />
      }
      open={open}
      onOk={onSubmit}
      onCancel={() => {
        onClose?.();
      }}
      okText={<IntlMessage id="logManagement.update" />}
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      okButtonProps={{ loading, disabled: readonly }}
      destroyOnClose
      width={600}
    >
      <IndicesNotificationGroupForm
        form={form}
        isEditor={isEditor}
        notifyList={notifyList}
        monitor={data}
      />
    </Modal>
  );
};
