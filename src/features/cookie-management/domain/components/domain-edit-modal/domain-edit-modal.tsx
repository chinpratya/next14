import { Form } from 'antd';
import { useEffect } from 'react';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateDomain } from '../../api/update-domain';
import { DomainSettingForm } from '../domain-setting-form';

export type DomainEditModalProps = {
  open?: boolean;
  onClose?: () => void;
  data?: Record<string, unknown>;
};

export const DomainEditModal = ({
  open,
  onClose,
  data,
}: DomainEditModalProps) => {
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const { submit, isLoading } = useUpdateDomain({
    domainId: data?.domainID as string,
    onSuccess: () => {
      onClose?.();
      showNotification({
        type: 'success',
        message: 'แก้ไขข้อมูลสำเร็จ',
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form, open]);

  const onUpdate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit({
      ...data,
      ...values,
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.modalEditWebsite.title
          }
        />
      }
      afterClose={() => {
        form.resetFields();
      }}
      width={800}
      onOk={onUpdate}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <Form
        form={form}
        initialValues={{
          limit_scan: 100,
        }}
      >
        <DomainSettingForm disabledSite={true} />
      </Form>
    </Modal>
  );
};
