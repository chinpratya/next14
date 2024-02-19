import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateRiskMatrixEffect } from '../../api/create-risk-matrix-effect';
import { useUpdateRiskMatrixEffect } from '../../api/update-risk-matrix-effect';
import { RiskMatrixEffectType } from '../../types';

export type RiskMatrixEffectDialogProps = {
  riskMatrixId: string;
  riskMatrixEffect?: RiskMatrixEffectType;
  open?: boolean;
  onClose?: () => void;
  isEditable?: boolean;
};

export const RiskMatrixEffectDialog = ({
  riskMatrixId,
  riskMatrixEffect,
  open,
  onClose,
  isEditable,
}: RiskMatrixEffectDialogProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const createRiskMatrixEffect =
    useCreateRiskMatrixEffect({
      riskMatrixId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.common.notification.created
          ) as string,
        });
        onClose?.();
      },
    });

  const updateRiskMatrixEffect =
    useUpdateRiskMatrixEffect({
      riskMatrixId,
      riskMatrixEffectId:
        riskMatrixEffect?.effectID?.toString() ?? '',
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.common.notification.saved
          ) as string,
        });
        onClose?.();
      },
    });

  const onCreate = async () => {
    await form.validateFields();
    createRiskMatrixEffect.submit({
      ...form.getFieldsValue(),
      name: form.getFieldValue('severity'),
    });
  };

  const onUpdate = async () => {
    await form.validateFields();
    updateRiskMatrixEffect.submit({
      ...form.getFieldsValue([
        'severity',
        'effect',
        'description',
      ]),
      name: form.getFieldValue('severity'),
    });
  };

  useEffect(() => {
    if (isEditable) {
      form.setFieldsValue(riskMatrixEffect);
    } else {
      form.setFieldValue(
        'effectID',
        riskMatrixEffect?.effectID
      );
    }
  }, [form, isEditable, riskMatrixEffect]);

  return (
    <Modal
      title={
        isEditable ? (
          <IntlMessage
            id={
              tokens.dataBreach.riskMatrix.editEffectScore
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.dataBreach.riskMatrix
                .createEffectScore
            }
          />
        )
      }
      open={open}
      onCancel={onClose}
      afterClose={() => {
        form.resetFields();
      }}
      okButtonProps={{
        loading:
          createRiskMatrixEffect.isLoading ||
          updateRiskMatrixEffect.isLoading,
      }}
      onOk={isEditable ? onUpdate : onCreate}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.level}
            />
          }
          name="effectID"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix.levelRequired
              )
            ),
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.severity}
            />
          }
          name="severity"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix
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
                tokens.dataBreach.riskMatrix.effectTitle
              }
            />
          }
          name="effect"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix
                  .effectRequired
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
                tokens.dataBreach.riskMatrix
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
