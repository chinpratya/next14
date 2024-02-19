import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddTemplateRiskEffectTable } from '../../../api/add-template-risk-effect-table';
import { useUpdateTemplateRiskEffectTable } from '../../../api/update-template-risk-effect-table';
import { TemplateRiskEffectTable } from '../../../types';

export type TemplateRiskSettingEffectTableModalProps = {
  open: boolean;
  onClose: () => void;
  data: TemplateRiskEffectTable;
  isEditable?: boolean;
  assessmentId: string;
};

export const TemplateRiskSettingEffectTableModal = ({
  open,
  onClose,
  data,
  isEditable,
  assessmentId,
}: TemplateRiskSettingEffectTableModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const addEffect = useAddTemplateRiskEffectTable({
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

  const updateEffect = useUpdateTemplateRiskEffectTable({
    assessmentId,
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
    if (isEditable) {
      form.setFieldsValue(data);
    } else {
      form.setFieldsValue({
        tableID: data?.tableID,
      });
    }
  }, [isEditable, data, form]);

  const onSubmit = () => {
    const value = form.getFieldsValue();
    if (isEditable) {
      updateEffect.submit({
        data: value,
        effectId: data?.effectId ?? '',
        tableId: value.tableID,
      });
    } else {
      addEffect.submit({
        data: value,
        effectId: data?.effectId ?? '',
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        isEditable ? (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .editEffect
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .createEffect
            }
          />
        )
      }
      afterClose={() => form.resetFields()}
      onOk={onSubmit}
      okButtonProps={{
        loading:
          addEffect.isLoading || updateEffect.isLoading,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate.level
              }
            />
          }
          name="tableID"
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .levelRequired
              )
            ),
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .severity
              }
            />
          }
          name="severity"
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .severityRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate.effect
              }
            />
          }
          name="effect"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .descriptionSeverity
              }
            />
          }
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
