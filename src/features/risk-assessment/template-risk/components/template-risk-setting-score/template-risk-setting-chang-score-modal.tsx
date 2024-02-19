import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateTemplateRiskScoreResolution } from '../../api/update-template-risk-score-resolution';

export type TemplateRiskSettingChangScoreModalProps = {
  open: boolean;
  onClose: () => void;
  assessmentId: string;
  currentResolution?: number;
};

export const TemplateRiskSettingChangScoreModal = ({
  open,
  onClose,
  assessmentId,
  currentResolution = 0,
}: TemplateRiskSettingChangScoreModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const update = useUpdateTemplateRiskScoreResolution({
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

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate
              .editRiskScore
          }
        />
      }
      onOk={() => update.submit(form.getFieldsValue())}
      afterClose={() => form.resetFields()}
      okButtonProps={{ loading: update.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="resolution"
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .resolution
              }
            />
          }
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskTemplate
                  .resolutionRequired
              )
            ),
          ]}
        >
          <Select
            options={[
              {
                label: '3',
                value: 3,
                disabled: currentResolution === 3,
              },
              {
                label: '4',
                value: 4,
                disabled: currentResolution === 4,
              },
              {
                label: '5',
                value: 5,
                disabled: currentResolution === 5,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
