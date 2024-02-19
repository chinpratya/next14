import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddTemplateRiskLikelihood } from '../../api/add-template-risk-likelihood';
import { useUpdateTemplateRiskLikelihood } from '../../api/update-template-risk-likelihood';
import { TemplateRiskLikelihood } from '../../types';

export type TemplateRiskSettingChanceModalProps = {
  open: boolean;
  onClose: () => void;
  data: TemplateRiskLikelihood;
  isEditable?: boolean;
  assessmentId: string;
};

export const TemplateRiskSettingChanceModal = ({
  open,
  onClose,
  data,
  isEditable,
  assessmentId,
}: TemplateRiskSettingChanceModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const addChance = useAddTemplateRiskLikelihood({
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

  const updateChance = useUpdateTemplateRiskLikelihood({
    assessmentId,
    likelihoodId: data?.likelihoodID,
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
        likelihoodID: data?.likelihoodID,
      });
    }
  }, [isEditable, data, form]);

  const onSubmit = () => {
    const value = form.getFieldsValue();
    if (isEditable) {
      updateChance.submit(value);
    } else {
      addChance.submit(value);
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
                .editRiskScore
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .creteRiskScore
            }
          />
        )
      }
      afterClose={() => form.resetFields()}
      onOk={onSubmit}
      okButtonProps={{
        loading:
          updateChance.isLoading || addChance.isLoading,
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
          name="likelihoodID"
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
                  .likelihood
              }
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .likelihoodRequired
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
                tokens.riskAssessment.riskTemplate
                  .description
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
