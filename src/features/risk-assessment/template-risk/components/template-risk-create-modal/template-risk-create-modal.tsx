import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTemplateRisk } from '../../api/create-list-template-risk';
import { TemplateRiskForm } from '../template-risk-form';

export type TemplateRiskCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const TemplateRiskCreateModal = ({
  open,
  onClose,
}: TemplateRiskCreateModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const { submit, isLoading } = useCreateTemplateRisk({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskTemplate.notifications
            .create
        ) as string,
      });
      onClose();
    },
  });

  const onSubmit = () => {
    const value = form.getFieldsValue();
    submit(value);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.createTitle
          }
        />
      }
      onOk={onSubmit}
      okButtonProps={{ loading: isLoading }}
      afterClose={() => form.resetFields()}
    >
      <TemplateRiskForm form={form} />
    </Modal>
  );
};
