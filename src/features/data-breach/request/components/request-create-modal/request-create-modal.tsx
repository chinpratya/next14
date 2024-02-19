import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListWebform } from '../../../webform';
import { useCreateRequest } from '../../api/create-request';

type RequestCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const RequestCreateModal = ({
  open,
  onCancel,
}: RequestCreateModalProps) => {
  const { t } = useTranslation();
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
        message: t(
          tokens.dataBreach.request.notifications.create
        ) as string,
      });
      onCancel();
    },
  });

  const handlerCreateRequest = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    // createRequest.submit(values);

    window.open(
      `https://portal.beta.onefence.co/data-breach/web-form/${values?.name}`
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
        <IntlMessage
          id={tokens.dataBreach.request.createTitle}
        />
      }
      open={open}
      onCancel={onCancel}
      onOk={handlerCreateRequest}
      okButtonProps={{ loading: createRequest.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.webform}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(tokens.dataBreach.request.webformRequired)
            ),
          ]}
        >
          <Select options={webformOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
