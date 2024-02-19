import { Form, Select } from 'antd';
import { useEffect } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListWebform } from '@/features/dsar-automation';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

import { useCreateRequest } from '../../api/create-request';

type RequestCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const RequestCreateModal = ({
  open,
  onCancel,
}: RequestCreateModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data } = useListWebform({});

  const webformOptions = data?.data?.map((webform) => ({
    value: webform.webformID,
    label: webform.name,
  }));

  const createRequest = useCreateRequest({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Create request successfully.',
      });
      onCancel();
    },
  });

  const handlerCreateRequest = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    // createRequest.submit(values);

    window.open(
      `https://portal.beta.onefence.co/dsar-automation/web-form/${values?.name}`
    );
    onCancel();
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={
        <IntlMessage id="incidentManagement.incident.create.title" />
      }
      open={open}
      onCancel={onCancel}
      onOk={handlerCreateRequest}
      okButtonProps={{ loading: createRequest.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="เว็บฟอร์ม"
          name="name"
          rules={[
            validation.required('กรุณาเลือก เว็บฟอร์ม'),
          ]}
        >
          <Select options={webformOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
