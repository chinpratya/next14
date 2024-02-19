import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateRiskMatrixChance } from '../../api/create-risk-matrix-chance';
import { useUpdateRiskMatrixChance } from '../../api/update-risk-matrix-chance';
import { RiskMatrixChanceType } from '../../types';

export type RiskMatrixChanceDialogProps = {
  riskMatrixId: string;
  riskMatrixChance?: RiskMatrixChanceType;
  open?: boolean;
  onClose?: () => void;
  isEditable?: boolean;
};

export const RiskMatrixChanceDialog = ({
  riskMatrixId,
  riskMatrixChance,
  open,
  onClose,
  isEditable,
}: RiskMatrixChanceDialogProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { showNotification } = useNotifications();

  const createRiskMatrixChance =
    useCreateRiskMatrixChance({
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

  const updateRiskMatrixChance =
    useUpdateRiskMatrixChance({
      riskMatrixId,
      riskMatrixChanceId:
        riskMatrixChance?.likelihoodID?.toString() ?? '',
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
    createRiskMatrixChance.submit(form.getFieldsValue());
  };

  const onUpdate = async () => {
    await form.validateFields();
    updateRiskMatrixChance.submit(
      form.getFieldsValue(['name', 'description'])
    );
  };

  useEffect(() => {
    if (isEditable) {
      form.setFieldsValue(riskMatrixChance);
    } else {
      form.setFieldValue(
        'likelihoodID',
        riskMatrixChance?.likelihoodID
      );
    }
  }, [form, isEditable, riskMatrixChance]);

  return (
    <Modal
      title={
        isEditable ? (
          <IntlMessage
            id={
              tokens.dataBreach.riskMatrix.editRiskScore
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.dataBreach.riskMatrix.creteRiskScore
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
          createRiskMatrixChance.isLoading ||
          updateRiskMatrixChance.isLoading,
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
          name="likelihoodID"
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
              id={tokens.dataBreach.riskMatrix.likelihood}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix
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
                tokens.dataBreach.riskMatrix.description
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
