import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateIncidentTemplate } from '../../api/create-incident-template';

export type IncidentTemplateCreateDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const IncidentTemplateCreateDialog = ({
  open,
  onClose,
}: IncidentTemplateCreateDialogProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const [form] = Form.useForm();

  const createIncidentTemplate =
    useCreateIncidentTemplate({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.create
          ) as string,
        });
        onClose?.();
      },
    });

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createIncidentTemplate.submit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.dataBreach.incidentTemplate.createTitle
          }
        />
      }
      afterClose={() => form.resetFields()}
      onOk={onCreate}
      okButtonProps={{
        loading: createIncidentTemplate.isLoading,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: '',
        }}
      >
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={tokens.dataBreach.incidentTemplate.name}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.dataBreach.incidentTemplate
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <IntlMessage
              id={
                tokens.dataBreach.incidentTemplate
                  .description
              }
            />
          }
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
