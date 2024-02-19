import { Form, Modal } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';

import { useUpdateAgencies } from '../../api/update-agencies';
import { Agencies } from '../../types';
import { AgenciesForm } from '../agencies-form/agencies-form';

type AgenciesEditModalProps = {
  open: boolean;
  agencies?: Agencies;
  onCancel?: () => void;
};

export const AgenciesEditModal = ({
  open,
  agencies,
  onCancel,
}: AgenciesEditModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { isLoading, submit } = useUpdateAgencies({
    groupID: '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update agencies success',
      });
      onCancel?.();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    submit({
      ...value,
      type_group: 'agencies',
      groupId: agencies?.groupId,
    });
  };

  useEffect(() => {
    if (agencies) form.setFieldsValue(agencies);
  }, [agencies, form]);

  return (
    <Modal
      title="แก้ไขหน่วยงาน"
      centered
      open={open}
      okButtonProps={{ loading: isLoading }}
      onOk={onSubmit}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
    >
      <AgenciesForm form={form} />
    </Modal>
  );
};
