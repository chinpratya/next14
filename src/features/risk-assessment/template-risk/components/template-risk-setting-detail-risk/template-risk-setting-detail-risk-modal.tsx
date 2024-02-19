import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateTemplateRiskScoreRisk } from '../../api/update-template-risk-score-risk';
import { TemplateRiskScoreRiskDetail } from '../../types';

export type TemplateRiskSettingDetailRiskModalProps = {
  open: boolean;
  onClose: () => void;
  data: TemplateRiskScoreRiskDetail;
  assessmentId: string;
};

export const TemplateRiskSettingDetailRiskModal = ({
  open,
  onClose,
  data,
  assessmentId,
}: TemplateRiskSettingDetailRiskModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const updateRisk = useUpdateTemplateRiskScoreRisk({
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
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate
              .editRiskDetails
          }
        />
      }
      onOk={() =>
        updateRisk.submit({
          data: form.getFieldsValue(),
          scoreId: data.riskID,
        })
      }
      okButtonProps={{ loading: updateRisk.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .riskLevel
              }
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .riskLevelRequired
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
                tokens.riskAssessment.riskTemplate
                  .description
              }
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .descriptionRequired
              )
            ),
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
