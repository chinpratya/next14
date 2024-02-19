import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListWebform } from '../../../webform';
import { useGetWebformAdminPortal } from '../../api/get-webform-admin-portal';

export type RequestAdminCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const RequestAdminCreateModal = ({
  open,
  onCancel,
}: RequestAdminCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data } = useListWebform({});

  const webformOptions = data?.data?.map((webform) => ({
    value: webform.webformID,
    label: webform.name,
  }));

  const webformAdmin = useGetWebformAdminPortal({
    webformId: form.getFieldValue('webformID'),
    identify: form.getFieldValue('identify'),
  });

  const handlerCreateRequest = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    window.open(
      `https://portal.beta.onefence.co/dsar-automation/web-form/${values?.webformID}?token=${webformAdmin?.data?.token}`
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
        <IntlMessage id="dsarAutomation.request.create.title" />
      }
      open={open}
      onCancel={onCancel}
      onOk={handlerCreateRequest}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.create.name" />
          }
          name="webformID"
          rules={[
            validation.required(
              t(
                'dsarAutomation.request.create.nameRequired'
              )
            ),
          ]}
        >
          <Select options={webformOptions} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.create.identify" />
          }
          name="identify"
          rules={[
            validation.required(
              t(
                'dsarAutomation.request.create.identifyRequired'
              )
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                'dsarAutomation.request.create.identifyPlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
