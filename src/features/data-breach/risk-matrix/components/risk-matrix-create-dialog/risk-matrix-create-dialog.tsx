import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateRiskMatrix } from '../../api/create-risk-matrix';

export type RiskMatrixCreateDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const RiskMatrixCreateDialog = ({
  open,
  onClose,
}: RiskMatrixCreateDialogProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const [form] = Form.useForm();

  const createRiskMatrix = useCreateRiskMatrix({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.riskMatrix.notifications
            .create
        ) as string,
      });
      onClose?.();
    },
  });

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createRiskMatrix.submit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.create}
        />
      }
      afterClose={() => form.resetFields()}
      onOk={onCreate}
      okButtonProps={{
        loading: createRiskMatrix.isLoading,
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
              id={tokens.dataBreach.riskMatrix.name}
            />
          }
          rules={[
            validation.required(
              t(tokens.dataBreach.riskMatrix.nameRequired)
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
                tokens.dataBreach.riskMatrix.description
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
