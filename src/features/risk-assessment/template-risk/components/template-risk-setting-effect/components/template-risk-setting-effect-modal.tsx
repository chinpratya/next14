import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddTemplateRiskEffect } from '../../../api/add-template-risk-effect';
import { useUpdateTemplateRiskEffect } from '../../../api/update-template-risk-effect';
import { TemplateRiskEffect } from '../../../types';

export type TemplateRiskSettingEffectModalProps = {
  open: boolean;
  onClose: () => void;
  data?: TemplateRiskEffect;
  assessmentId: string;
};

export const TemplateRiskSettingEffectModal = ({
  open,
  onClose,
  data,
  assessmentId,
}: TemplateRiskSettingEffectModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const addEffect = useAddTemplateRiskEffect({
    assessmentId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.common.notification.created
        ) as string,
      });
      onClose();
    },
  });

  const editEffect = useUpdateTemplateRiskEffect({
    assessmentId,
    effectId: data?.effectId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.common.notification.saved
        ) as string,
      });
      onClose();
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onSubmit = () => {
    const value = form.getFieldsValue();
    if (data) {
      editEffect.submit(value);
    } else {
      addEffect.submit(value);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        data ? (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .editEffect
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate.addEffect
            }
          />
        )
      }
      afterClose={() => form.resetFields()}
      onOk={onSubmit}
      okButtonProps={{
        loading:
          addEffect.isLoading || editEffect.isLoading,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskTemplate.name}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
